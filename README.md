# Rekha Board · रेखा

A hand-drawn whiteboard for India's eight most-spoken languages — Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu and Kannada (plus English).

## Features

- **Sketchy shapes** — rectangle, diamond, ellipse, arrow, line, freehand pen, eraser (rendered with [rough.js](https://roughjs.com)).
- **Fully localized UI** in 9 languages, switchable from the script ribbon; Urdu mirrors the whole interface right-to-left.
- **Phonetic typing** — type in Roman letters and get native script as you go:
  `namaste → नमस्ते`, `namaskaar → নমস্কার`, `telugu → తెలుగు`, `vaNakkam → வணக்கம்`, `gujaraatee → ગુજરાતી`, `salaam → سلام`, `kannaDa → ಕನ್ನಡ`.
  Native keyboards / IMEs work too; the toggle lives in the style card.
- **Script-matched handwriting fonts** (Kalam, the Baloo family, Gulzar).
- Select, move, resize, duplicate, layer order, copy/paste, undo/redo, zoom & pan, dark mode.
- Export **PNG** / **SVG**, save & open `.rekha.json` files, automatic local save.

## Run

It's a static site — no build step. Serve the folder and open it:

```bash
python -m http.server 5180
```

Then visit http://localhost:5180. Fonts and rough.js load from CDNs, so an internet connection is needed.

## Shortcuts

| Key | Tool | Key | Action |
| --- | --- | --- | --- |
| `1` / `V` | Select | `Ctrl+Z` / `Ctrl+Shift+Z` | Undo / redo |
| `H` / Space-drag | Pan | `Ctrl+D` | Duplicate |
| `2` / `R` | Rectangle | `Ctrl+C` / `Ctrl+V` | Copy / paste |
| `3` / `D` | Diamond | `Delete` | Delete selection |
| `4` / `O` | Ellipse | `Ctrl+wheel` | Zoom |
| `5` / `A` | Arrow | `Ctrl+S` | Save file |
| `6` / `L` | Line | `Enter` | Edit selected text |
| `7` / `P` | Pen | `Q` | Keep tool active |
| `8` / `T` | Text (double-click also works) | `Esc` | Finish / deselect |
| `0` / `E` | Eraser | | |

### Phonetic scheme

Long vowels `aa ee oo`, `ai au`; retroflex `T Th D Dh N`, `Sh` (ष), `sh` (श); `M` anusvara, `H` visarga, `~` chandrabindu, `|` danda.
Tamil, Telugu, Kannada: `e`/`o` short, `E`/`O` long. Tamil extras: `zh` (ழ), `R` (ற), `nn` (ன).

## Files

- `index.html`, `styles.css` — layout and theme
- `app.js` — canvas engine, tools, history, export
- `i18n.js` — UI strings and script/font table
- `translit.js` — Roman → Indic transliteration
