# Chrome Picture-in-Picture Extension 📺

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Opis

Rozszerzenie Chrome umożliwiające łatwe uruchamianie trybu Picture-in-Picture (PiP) dla dowolnych filmów na stronach internetowych. Dodaje intuicyjny przycisk do każdego elementu video oraz oferuje wygodne skróty klawiszowe.

## ✨ Funkcje

- **Automatyczne wykrywanie video** - Rozszerzenie automatycznie znajduje wszystkie elementy video na stronie (w tym osadzone w ramkach iframe).
- **Przycisk hover** - Nowoczesny przycisk oparty o ikony SVG pojawia się w prawym górnym rogu po najechaniu na wideo.
- **Skróty klawiszowe**:
  - `Ctrl+Shift+P` (Natywny) - Aktywuje PiP dla aktualnie odtwarzanego wideo globalnie. Konfigurowalny przez ustawienia skrótów Chrome.
  - Podwójne kliknięcie na video - Natychmiastowe uruchomienie PiP (z opcją wyłączenia w ustawieniach).
- **Opcje i Personalizacja** - Dedykowana strona ustawień pozwalająca na:
  - Ukrycie przycisku najechania.
  - Wyłączenie akcji podwójnego kliknięcia.
  - Stworzenie "czarnej listy" domen, na których rozszerzenie ma pozostać nieaktywne (np. Netflix, YouTube).
- **Popup interfejs** - Wygodny panel sterowania z poziomu ikony rozszerzenia, zawierający szybki skrót do Opcji.
- **Obsługa dynamicznego contentu** - Automatycznie obsługuje video dodawane po załadowaniu strony.
- **Wielojęzyczność** - Wbudowane natywne wsparcie dla języka angielskiego i polskiego.

## 🚀 Instalacja

### Instalacja dla deweloperów

1. Pobierz lub sklonuj to repozytorium:
```bash
git clone https://github.com/AnonBOTpl/Chrome-Picture-in-Picture-Extension.git
cd Chrome-Picture-in-Picture-Extension
```

2. Otwórz Chrome i przejdź do `chrome://extensions/`

3. Włącz "Tryb programisty" (Developer mode) w prawym górnym rogu

4. Kliknij "Załaduj rozpakowane" (Load unpacked) i wybierz folder z rozszerzeniem

5. Rozszerzenie pojawi się na liście i będzie gotowe do użycia

### Instalacja z Chrome Web Store

*Wkrótce dostępne w Chrome Web Store*

## 🎮 Jak używać

### Metoda 1: Przycisk hover
1. Otwórz dowolną stronę z video
2. Najedź myszką na element video
3. Kliknij pojawiający się przycisk ze specjalną ikoną w prawym górnym rogu

### Metoda 2: Skrót klawiszowy
1. Naciśnij `Ctrl+Shift+P` w dowolnym momencie na stronie z video
2. PiP uruchomi się dla aktualnie odtwarzanego video lub pierwszego dostępnego

### Metoda 3: Podwójne kliknięcie
1. Kliknij dwukrotnie bezpośrednio na element video
2. PiP uruchomi się natychmiastowo

### Metoda 4: Panel rozszerzenia
1. Kliknij ikonę rozszerzenia w pasku narzędzi Chrome
2. Użyj przycisków w popup do aktywacji PiP lub znalezienia video



## 🔧 Wymagania techniczne

- Chrome 88+ (dla Manifest V3)
- Obsługa Picture-in-Picture API w przeglądarce
- Strony muszą zawierać elementy `<video>` z obsługą PiP

## 🌍 Obsługiwane języki

Rozszerzenie obsługuje wielojęzyczność poprzez pliki w folderze `_locales/`. Aktualnie przygotowane do obsługi:
- Angielski (en)
- Polski (pl)
- Dodatkowe języki można łatwo dodać

## 🤝 Współpraca

Chętnie przyjmę współpracę! Jeśli chcesz pomóc:

1. Fork tego repozytorium
2. Stwórz branch dla swojej funkcji (`git checkout -b feature/AmazingFeature`)
3. Zatwierdź zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 🐛 Zgłaszanie błędów

Jeśli znalazłeś błąd lub masz sugestię:
1. Sprawdź czy problem nie został już zgłoszony w [Issues](https://github.com/AnonBOTpl/Chrome-Picture-in-Picture-Extension/issues)
2. Jeśli nie, stwórz nowe Issue z dokładnym opisem problemu

## 📝 Licencja

Ten projekt jest dostępny na licencji MIT. Zobacz plik [LICENSE](LICENSE) po szczegóły.

## 👨‍💻 Autor

**AnonBOTpl**
- GitHub: [@AnonBOTpl](https://github.com/AnonBOTpl)

## 🙏 Podziękowania

- Chrome DevTools team za Picture-in-Picture API
- Społeczność Chrome Extensions za dokumentację i wsparcie

---

⭐ **Jeśli podobało Ci się to rozszerzenie, zostaw gwiazdkę na GitHub!** ⭐
