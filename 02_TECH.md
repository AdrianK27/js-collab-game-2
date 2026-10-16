# Kontrakt techniczny bez instalacji

## Trzy pliki i wspólne środowisko

`engine.js` zawiera stałe, kolekcję pokojów, `stanPoczatkowy()`, `przejscie(stanPrzed, komenda)`, `czyStan(wartosc)`. Reguły nie dotykają konsoli ani interfejsu. `app.js` przechowuje bieżący stan, wywołuje reguły, pokazuje komunikaty, eksportuje/importuje tekst. `index.html` ładuje je tak:

```html
<script src="./engine.js" defer></script>
<script src="./app.js" defer></script>
```

Otwórz HTML dwuklikiem. Oba zwykłe skrypty wykonują się w podanej kolejności po przetworzeniu HTML. Nie dodawaj async, type=module, import ani export. Nie deklaruj tych samych nazw const/let w obu plikach. Funkcje i zmienne współdzielą globalne środowisko; let na najwyższym poziomie nie staje się automatycznie polem window, ale pozostaje dostępne po nazwie. Podział na pliki nie jest enkapsulacją.

## Sugerowany model

```js
{
  pokoj: 1,
  energia: 10,
  karta: false,
  bezpiecznik: false,
  zasilanie: false,
  koniec: false,
  wygrana: false
}
```

Pokoje 1–4 to recepcja, magazyn, serwerownia, wyjście. Dane pokojów są tablicą obiektów z id i nazwą. Nie myl id z indeksem tablicy.

Komendy silnika: lewo, prawo, karta, bezpiecznik, napraw, wyjdz. Każda zaakceptowana czynność kosztuje jedną energię, odrzucona zero. Wynik zawsze ma {stan, komunikat}. Przy odmowie można zwrócić wejściowy obiekt bez zmian; przy sukcesie nowy płaski rekord. Koszt nalicza tylko silnik. Po zakończeniu komendy nie zmieniają stanu. Wygrana przy ostatniej energii ma pierwszeństwo.

API: gra.idz(kierunek), gra.akcja(co), gra.status(), gra.mapa(), gra.start(), gra.eksportuj(), gra.importuj(tekst). Eksport zwraca string; import zwraca true/false i pokazuje komunikat. Nazwy można zmienić po zapisaniu decyzji i zaktualizowaniu wszystkich wywołań. API jest konwencją używania kodu, nie zabezpieczeniem przed konsolą.

## Przykład reguły z innej domeny

```js
function oznaczOplacona(faktura) {
  if (faktura.oplacona) {
    return { dane: faktura, komunikat: "Już opłacona" };
  }
  return { dane: { ...faktura, oplacona: true }, komunikat: "Przyjęto" };
}
```

Funkcja zwraca nowy obiekt dopiero przy zmianie. Nie nadpisuje wejścia i nie wypisuje tekstu. Przenieście zasadę, ale warunki gry opracujcie sami. Spread jest płytki; zagnieżdżone rozszerzenia potrzebują świadomego kopiowania zmienianych fragmentów.

## Format i droga zapisu

Pakiet: {wersja: 1, stan: ...}. To dane, nie kod wykonywany przez eval. Eksport używa JSON.stringify, import JSON.parse. Zakazane zastępowanie parsera przez eval lub Function.

W konsoli `console.log(gra.eksportuj())` pokazuje surowy JSON. Użytkownik kopiuje treść do edytora, zapisuje jako postep.json, potem może odświeżyć stronę. Do importu wkleja zawartość pliku przez:

```js
gra.importuj(prompt("Wklej zawartość postep.json"));
```

Prompt zwraca tekst albo null po anulowaniu. Obsłużcie oba przypadki. W oknie wklejamy sam JSON, bez polecenia gra.importuj i bez zewnętrznych apostrofów. Można też podać string bezpośrednio. Nie wymagamy automatycznego dostępu do plików, schowka ani storage. Samo wywołanie eksportu nie tworzy pliku.

## Walidacja

Najpierw sprawdź typ argumentu i pusty tekst. Parse w try/catch. Następnie: opakowanie różne od null, obiekt niebędący tablicą, wersja 1, poprawny stan. Dla stanu: istniejący całkowity numer pokoju, całkowita energia 0–10, pięć booleanów; bezpiecznik i zasilanie nie są równocześnie true; wygrana wymaga pokoju 4, karty i zasilania; koniec odpowiada wygranej albo zerowej energii. Walidacja nie dowodzi pełnej osiągalności historii i nie jest antycheatem.

Dane po walidacji przepiszcie do nowego obiektu tylko ze znanych pól. Przypisanie bieżącego stanu następuje dopiero po sprawdzeniu całości. Błędny tekst, nieobsługiwana wersja, null i pusty string zostawiają działający stan.

Przykład walidatora spoza gry:

```js
function czyTemperatura(wartosc) {
  return wartosc !== null && typeof wartosc === "object"
    && Number.isInteger(wartosc.stopnie)
    && wartosc.stopnie >= 16 && wartosc.stopnie <= 25;
}
```

Kolejność chroni przed odczytem pola null. Poprawna składnia JSON nie gwarantuje spełnienia tego warunku. 
