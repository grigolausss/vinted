# Native macOS Setup Instructions (Tauri)

Per trasformare questa applicazione web in una **macOS Native Standalone App** utilizzando **Tauri**, segui questi passaggi:

## 1. Prerequisiti
Assicurati di avere installato:
- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- **Xcode Command Line Tools**: `xcode-select --install`

## 2. Inizializzazione Tauri
Esegui il seguente comando nella root del progetto:
```bash
npm install @tauri-apps/cli
npx tauri init
```

Durante l'init, usa questi valori:
- **Window title**: Vinted Listing Generator PRO
- **URL of dev server**: `http://localhost:5173`
- **Frontend dist directory**: `../dist`
- **Build command**: `npm run build`
- **Dev command**: `npm run dev`

## 3. Configurazione macOS (Apple-like)
Modifica `src-tauri/tauri.conf.json` per abilitare l'aspetto nativo:

```json
{
  "tauri": {
    "bundle": {
      "identifier": "com.vinted.generator.pro",
      "icon": ["icons/32x32.png", "icons/128x128.png"]
    },
    "windows": [
      {
        "title": "Vinted Listing Generator PRO",
        "width": 1400,
        "height": 900,
        "resizable": true,
        "decorations": true,
        "transparent": true,
        "macOSPrivateApi": true
      }
    ]
  }
}
```

## 4. Build dell'Applicazione
Per generare l'eseguibile `.app` o il pacchetto `.dmg`:
```bash
npm run tauri build
```
L'output si troverà in `src-tauri/target/release/bundle/dmg/`.

## 5. Funzionalità Native Supportate
Grazie a Tauri, questa app supporta già:
- **Dark Mode di sistema**: Gestita tramite Tailwind `media` strategy.
- **Shortcuts macOS**: Cmd+N, Cmd+C, Cmd+S (implementate in `src/hooks/useKeyboardShortcuts.js`).
- **Drag & Drop**: Nativo tramite API browser supportate da Tauri.
