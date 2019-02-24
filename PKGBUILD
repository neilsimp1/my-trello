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
sha256sums=('8c028ee831b2deddb7b35e368540832f05d58ae9904730d0c1200ec5096cf8f2'
            'ab377d6e3babc0710c68def9c104aa9d31aea35eb35d0131594c46dbec22d7bf'
            '1c0a41f7fe942bc9ba442b84e99e345112c3037051a88aab250c5fa287b93f52')

build() {
    cd "$srcdir"/$pkgname-$pkgver
    npm install
    npm run build:linux
}

package() {
    cd "$srcdir"/$pkgname-$pkgver/dist/trello-linux-x64
    install -dm755 "$pkgdir"/usr/lib
    install -Dm644 LICENSE "$pkgdir"/usr/share/licenses/$pkgname/LICENSE
    install -Dm644 resources/app/trello.png "$pkgdir"/usr/share/pixmaps/trello.png
    rm -rf $pkgname-$pkgver/{LICENSE}
    mv * "$pkgdir"/usr/lib/trello
    install -Dm755 trello "$pkgdir"/usr/bin/trello
    install -Dm644 trello.desktop "$pkgdir"/usr/share/applications/trello.desktop
}
