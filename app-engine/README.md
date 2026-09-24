# VPNonly privileged engine

This directory is the exact source snapshot for VPNonly's privileged helper.
It is generated from the private application repository by the release command;
`SOURCE-MANIFEST.sha256` makes accidental drift visible.

The engine:

- asks macOS to allocate a free `utunN` interface instead of claiming a fixed one;
- records and validates VPNonly's exact root process, interface and socket;
- changes only the dedicated `com.apple/vpnonly` PF anchor during normal use;
- routes or blocks private per-app groups without changing the Mac's default route;
- tears down only a tunnel that its root-owned state proves VPNonly created.

The command-line version at the repository root (`vpnonly`, installed with
Homebrew) is a separate, smaller implementation of the same idea, and it is
supported. It is not this engine: it loads its own `com.apple/vpnonly-cli` PF
anchor and runs the stock `wireguard-go`, which is why it works with NordVPN
only for now. This engine carries the inner-source patch
(`wireguard-go-nat.patch`) that lets the Mac app use any WireGuard provider.

VPNonly's own source in this directory is MIT licensed. The bundled WireGuard
programs retain their upstream licences; see `licenses/` and
`THIRD-PARTY-NOTICES.txt`.
