# Fork features

Read this before merging upstream. Every item must still work after the merge.

Branch: `main`, merged from `upstream/main` (merge, never rebase).

## 1. Running-apps checkbox picker

`vpnonly` lists the apps running now; tick one to quit it and reopen it inside the tunnel, untick to reopen it normally. Shows "↑/↓ N more" when the list scrolls, and `r` rescans running apps without leaving the list.

- Commits: `4ce3c89`, `f81d9fd`, `b5b0635`
- Files: `vpnonly`, `README.md`
- Check: run `vpnonly`. Running apps show, already-routed apps start ticked, `r` picks up an app opened after start, a long list shows the ↑/↓ hints.

## 2. Subcommands `ls`, `rm`, `down`, `all`

`ls` shows tunnel, server, exit IP and routed apps; `rm APP` takes one app off; `down` drops the tunnel; `all` reopens routed apps normally, drops tunnel and rules, and opens the NordVPN app.

- Commits: `4ce3c89`
- Files: `vpnonly` (dispatch near the end: `pick|rm|ls|down|all`), `up.sh` (writes `tunnel-server`), `down.sh` (removes it)
- Check: `vpnonly ls` prints the server and exit IP; `vpnonly rm <App>` reopens it outside the tunnel.

## 3. Apps kept out of the picker, NordVPN app conflict

Docker (carries the vpn-inc proxy containers, must keep the normal route), the NordVPN app and the hosting terminal never appear. If the NordVPN app is open, the picker offers to quit it.

- Commits: `4ce3c89`
- Files: `vpnonly` (`Docker.app|"$NORD_APP.app"` exclusion)
- Check: with Docker running, it is not in the list; with NordVPN.app open, `vpnonly` asks to quit it.

## 4. Exit country from a file

`up.sh` reads the country from `~/.config/vpnonly/country`, since the sudo re-exec drops `COUNTRY`. Default `sg`.

- Commits: `4ce3c89`
- Files: `up.sh`
- Check: `echo us > ~/.config/vpnonly/country`, tick an app, then `vpnonly ls` shows a US exit.

## 5. Root hardening

Root `curl` runs with `-q` (skip the user's `~/.curlrc`), `python3 -I` (skip user site-packages), `COUNTRY` and app names passed as argv instead of pasted into code, `umask 077` around the session file holding the private key.

- Commits: `4ce3c89`
- Files: `up.sh`, `status.sh`, `run.sh`, `vpnonly`
- Check: `grep -n 'curl -' up.sh status.sh vpnonly | grep -v -- '-q'` prints nothing; `grep -n 'python3 ' up.sh | grep -v -- '-I'` prints nothing; `grep -n 'on run argv' run.sh` still matches.

## 6. No upstream update check

The daily GitHub release check and "brew upgrade vpnonly" prompt are removed; they pointed at upstream's Homebrew formula.

- Commits: `4ce3c89`
- Files: `vpnonly`
- Check: `grep -n check_for_update vpnonly` prints nothing.
