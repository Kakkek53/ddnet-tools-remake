"""Install the official DDNet WASM client with the complete editor. No build needed."""
import hashlib
import io
from pathlib import Path
import tarfile
import urllib.request

VERSION = '20.2.1'
URL = f'https://ddnet.org/downloads/DDNet-{VERSION}-emscripten.tar.xz'
SHA256 = '05219751a55407b32106dace6ca186be1d41268c9de54c57f845074158fb8912'
FILES = ('DDNet.js', 'DDNet.wasm', 'DDNet.data', 'license.txt')
ROOT = Path(__file__).resolve().parent.parent / 'vendor' / 'ddnet-editor'

def install():
    with urllib.request.urlopen(URL, timeout=180) as response:
        archive = response.read()
    if hashlib.sha256(archive).hexdigest() != SHA256:
        raise RuntimeError('DDNet archive checksum mismatch; no runtime files were installed.')
    ROOT.mkdir(parents=True, exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(archive), mode='r:xz') as tar:
        for name in FILES:
            member = tar.getmember(f'DDNet-{VERSION}-Emscripten/{name}')
            if not member.isfile():
                raise RuntimeError(f'Invalid archive member: {name}')
            with tar.extractfile(member) as source:
                ROOT.joinpath(name).write_bytes(source.read())
    print(f'Installed verified DDNet {VERSION} WASM runtime.')

if __name__ == '__main__':
    install()
