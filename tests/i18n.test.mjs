import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const code = fs.readFileSync(new URL('../i18n.js',import.meta.url),'utf8');
function setup(saved, languages=['en-US']) {
    const root={querySelectorAll:()=>[]};
    const context={document:{documentElement:root,readyState:'loading',addEventListener(){},getElementById:()=>null,createTreeWalker:()=>({nextNode:()=>false})},navigator:{languages},localStorage:{getItem:()=>saved,setItem(){}},window:{dispatchEvent(){}},CustomEvent:class{},NodeFilter:{SHOW_TEXT:4}};
    vm.createContext(context);vm.runInContext(code,context);return context.window.I18n;
}
test('locale detection, preference and fallback',()=>{
    assert.equal(setup(undefined,['ru-RU','en-US']).language,'ru');
    assert.equal(setup('de',['ru-RU']).language,'de');
    assert.equal(setup('invalid',['fr-FR']).language,'en');
});
test('dynamic messages preserve values and translate across switches',()=>{
    const i=setup('ru');assert.equal(i.translate('Capturing frame 5 / 60…'),'Извлечение кадра 5 / 60…');
    assert.equal(i.translate('Choose a .map file first.'),'Сначала выбери файл .map.');
    assert.match(i.format('{width} × {height} px · frames: {count} · textures: {textures} · {memory} MiB texture memory · {placement}{loop}',{width:1920,height:1080,count:10,textures:10,memory:'79.1',placement:'full-screen background',loop:' · 1.000 s loop'}),/полноэкранный фон · повтор каждые 1.000 с/);
    i.setLanguage('de');assert.equal(i.translate('Capturing frame 5 / 60…'),'Frame 5 / 60 wird erfasst…');
    assert.match(i.translate('601 frames requested. Use at most 600 frames: reduce FPS or shorten the clip.'),/Angeforderte Frames: 601/);
    i.setLanguage('en');assert.equal(i.translate('No file selected'),'No file selected');
});
test('all website text has both translations except names, units and symbols',()=>{
    const i=setup('ru');
    const allowed=new Set(['D','DDNet','Tools','REMAKE','DDNet Tools Remake','GitHub ↗','PNG, JPEG, WebP · MP4, WebM','1024 px','1920 px · Full HD','2560 px · QHD','.map','.demo']);
    for(const file of ['index.html','load_map.html','team-colors.html','media-map.html']){
        const html=fs.readFileSync(new URL('../'+file,import.meta.url),'utf8').replace(/<script\b[\s\S]*?<\/script>/g,'');
        const texts=html.split(/<[^>]*>/).map(s=>s.trim()).filter(s=>/[A-Za-z]/.test(s)&&!allowed.has(s));
        for(const lang of ['ru','de']){
            i.setLanguage(lang);
            for(const text of texts)assert.notEqual(i.translate(text),text,`${file}: missing ${lang}: ${text}`);
        }
    }
});
test('reference map name is absent from maintained sources',()=>{
    for(const name of ['index.html','load_map.html','team-colors.html','media-map.html','map-writer.js','README.md','i18n.js']){
        const text=fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
        assert.equal(text.toLowerCase().includes(['night','themes'].join(' ')),false,name);
    }
});
