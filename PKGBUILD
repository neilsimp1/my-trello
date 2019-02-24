pkgname=my-trello
pkgver=0.0.1
pkgrel=1
pkgdesc="Yet another unofficial Trello desktop app"
arch=(any)
url="https://github.com/neilsimp1/my-trello"
license=('CC0 1.0')
depends=("electron")
makedepends=("npm")
source=("https://github.com/neilsimp1/$pkgname/archive/$pkgname-$pkgver.tar.gz"
        "trello"
        "trello.desktop")
sha256sums=('a2dda82dae5c6fddbf95ba497bf2a31bdd8daa3e2bb75df0f0ce944227678dac'
            '45d07040ac89555f6bd3aa4ab6c88d627c261b1ca2e1e5ab173381396241324a'
            '1c0a41f7fe942bc9ba442b84e99e345112c3037051a88aab250c5fa287b93f52')

build() {
    cd "$srcdir"/$pkgname-$pkgname-$pkgver
    npm install
    npm run build:linux
}

package() {
    cd "$srcdir"/$pkgname-$pkgname-$pkgver/dist/trello-linux-x64
    install -dm755 "$pkgdir"/usr/lib/trello
    install -Dm644 LICENSE "$pkgdir"/usr/share/licenses/$pkgname/LICENSE
    install -Dm644 resources/app/trello.png "$pkgdir"/usr/share/pixmaps/trello.png
    rm -rf $pkgname-$pkgver/{LICENSE}
    mv * "$pkgdir"/usr/lib/trello
    cd "$srcdir"
    install -Dm755 trello "$pkgdir"/usr/bin/trello
    install -Dm644 trello.desktop "$pkgdir"/usr/share/applications/trello.desktop
}
