# Prowadzenie krok po kroku

Ten dokument jest pomocą do tego samego zadania, nie łatwiejszym zestawem wymagań. Otwierajcie go tam, gdzie potrzebujecie. Wszystkie etapy wykonujecie w przeglądarce po dwukliku w HTML. Nie instalujecie Node ani serwera.

## Kontrakt i działający początek

**Wszyscy** uruchomcie starą grę. Przejdźcie jeden poprawny ruch i jedną odmowę. Wypiszcie, które informacje składają się na stan. Nie usuwajcie jedynej działającej kopii. Przygotujcie miejsce rozbudowy zgodnie ze znanym sposobem pracy w Git.

**Wszyscy** przeczytajcie brief i uzgodnijcie pola, komendy, wynik funkcji reguł oraz wersję zapisu. W DECYZJE.md zapiszcie wybrany kontrakt, jedną alternatywę i powód wyboru. Sugerowany model w TECH jest zgodny z pokazem nauczyciela. Jeśli zmieniacie nazwy, wszyscy muszą pracować według nowej umowy.

**Podział:** A tworzy engine.js i stanPoczatkowy. B tworzy app.js. C przygotowuje index.html i README. W parze B przejmuje HTML, a README tworzycie razem. W HTML wpiszcie oba skrypty w kolejności:

```html
<script src="./engine.js" defer></script>
<script src="./app.js" defer></script>
```

W engine.js umieśćcie kolekcję pokojów i funkcję stanPoczatkowy. Wewnątrz funkcji zwróćcie literał nowego obiektu; samodzielnie wpiszcie wszystkie pola. Nie deklarujcie jednego zmiennego wzorca na zewnątrz funkcji. Dwa wywołania mają oddać niezależne obiekty.

W app.js na początek wystarczy `console.log(stanPoczatkowy())`. Nie ma importu. Engine załadowany wcześniej dostarcza definicję funkcji. Nie dopisujcie export. Otwórzcie HTML dwuklikiem; w konsoli ma pojawić się stan początkowy.

Połączcie pierwszy fragment. Przy ReferenceError sprawdźcie nazwę funkcji i kolejność skryptów. Przy błędzie ponownej deklaracji usuńcie przypadkowo powieloną definicję. Sprawdźcie `const a = stanPoczatkowy(); const b = stanPoczatkowy(); a !== b` — wynik true. Zmiana a.energia nie powinna zmienić b.energia. Te próby wykonujcie po świeżym otwarciu strony, aby nie powielać const w tej samej konsoli.

## Silnik pełnej gry

**Podział:** A pisze przejscie(stanPrzed, komenda), B przygotowuje przypadki wejścia i oczekiwanych wyjść, C rozwija kolekcję pokojów. W parze B łączy dane mapy z próbami. Funkcja zawsze zwraca obiekt o tym samym kształcie, także przy odmowie.

Przykład analogiczny — rezerwacja miejsca:

```js
function zarezerwuj(miejsce) {
  if (miejsce.zajete) return { dane: miejsce, komunikat: "Zajęte" };
  return { dane: { ...miejsce, zajete: true }, komunikat: "Przyjęto" };
}
```

Użyjcie tej zasady, nie kopiujcie domeny rezerwacji. Na początku obsłużcie zakończoną grę. Dla ruchu obliczcie kandydacki cel, sprawdźcie, czy istnieje, i dopiero przygotujcie nowy stan. Nie zmieniajcie pola wejściowego przed sprawdzeniem ściany.

Dopiszcie akcje. Karta dostępna w pierwszym pokoju tylko raz. Bezpiecznik w drugim nie pojawia się ponownie po zamontowaniu. Naprawa wymaga właściwego miejsca i bezpiecznika, który zużywa. Wyjście wymaga pozycji, karty i zasilania. Warunki piszecie samodzielnie na podstawie pierwszej gry i briefu.

Integracja i koszt. Odrzucone działanie wraca ze starym stanem; dopiero wspólna ścieżka sukcesu odejmuje jedną energię. Aplikacja nie odejmuje jej ponownie. Przy wyjściu na ostatniej energii najpierw ustalcie, że gracz wygrał, potem obliczcie stan końcowy. Nie wyświetlajcie porażki tylko dlatego, że energia wyniosła zero po zwycięskiej akcji.

Wynik etapu: poprawny ruch, ściana, nieznana komenda i przynajmniej jedna akcja działają przez bezpośrednie wywołanie reguły. Obiekt wejściowy po wywołaniu zachowuje poprzednie pola. Jeżeli dwa wywołania z tym samym wejściem dają inne wyniki bez innych przyczyn, poszukajcie mutacji lub odczytu ukrytej zmiennej globalnej.

## Polecenia, walidator i tekst zapisu

**Podział:** B zastępuje tymczasowy log w app.js deklaracją `let stan = stanPoczatkowy()`. Pod nią definiuje funkcje komend. Każda pobiera wynik przejscie, przyjmuje wynik.stan i wypisuje wynik.komunikat. Samodzielnie dopiszcie status i reset. Reset wywołuje fabrykę stanu, nie odtwarza wcześniej zmienionego obiektu.

A pisze czyStan w engine.js. Zaczyna od sprawdzenia null/obiektu/tablicy, następnie typów, zakresów i zależności z TECH. C przygotowuje próbki błędów: tekstowa energia, brak pola, numer pokoju 99, sprzeczne booleany. W parze A zapisuje próbki z B po ukończeniu pierwszych funkcji.

Na końcu app.js grupujecie funkcje w `window.gra`. Dla przypomnienia, w innej domenie:

```js
function przywitaj() { console.log("Cześć"); }
window.demo = { przywitaj };
```

`demo.przywitaj()` korzysta z funkcji zapisanej we właściwości. Nie jest to izolacja zmiennych. W grze umówcie się korzystać z API; nie musicie implementować klas ani zamknięć ukrywających stan.

Eksport i import. Eksport tworzy pakiet {wersja: 1, stan} i zwraca JSON.stringify(pakiet). Nie ma klucza storage, zapisu do przeglądarki ani automatycznego pliku. Gdy wynik nie jest tekstem, sprawdźcie, czy użyliście return, a nie samego console.log wewnątrz funkcji.

Import otrzymuje tekst jako parametr. Odrzućcie nie-string i pusty tekst. W try/catch użyjcie JSON.parse. Wynik zapiszcie do zmiennej kandydackiej, nie od razu do aktualnego stanu. Sprawdźcie opakowanie, wersję i czyStan. Dopiero potem przepiszcie znane pola do nowego obiektu i podmieńcie stan. Samodzielnie dopiszcie komunikaty. Sukces zwraca true, odmowa false.

Analogiczny mechanizm na danych termostatu:

```js
function odczytajUstawienia(tekst) {
  const kandydat = JSON.parse(tekst);
  if (kandydat === null || typeof kandydat !== "object"
      || !Number.isInteger(kandydat.stopnie)
      || kandydat.stopnie < 16 || kandydat.stopnie > 25) {
    throw new Error("Złe ustawienia");
  }
  return { stopnie: kandydat.stopnie };
}
```

Ten przykład nie dotyka bieżącej aplikacji. Przy błędzie rzuca wyjątek, który wywołujący musi obsłużyć. W grze catch ma poinformować o odmowie. Nie wpisujcie pustego catch. Nie używajcie eval: czytacie dane, nie uruchamiacie przesłanego programu.

Pełne przeniesienie postępu. Wykonajcie kilka czynności, następnie `console.log(gra.eksportuj())`. Skopiujcie sam JSON do edytora i zapiszcie postep.json na pendrivie. Nie kopiujcie etykiety wiersza konsoli ani dodatkowego undefined. Odświeżcie stronę. Otwórzcie plik w edytorze i przenieście jego zawartość do:

```js
gra.importuj(prompt("Wklej JSON z postep.json"));
```

W oknie wpisujecie sam tekst JSON, bez zewnętrznych apostrofów. Prompt zwraca string, a anulowanie null; przygotowany warunek importu musi obsłużyć oba. To jedno okno pomocnicze, nie pętla gry. Zwykłe polecenia nadal wpisujecie w konsoli. Kopiowanie tekstu przez człowieka jest częścią funkcji zapisu na tym etapie.

## Integracja i obsługa odmów

**Podział:** zmieńcie role. Osoba pisząca interfejs czyta walidator, autor reguł objaśnia eksport i import. Uzgodnijcie nazwy przed połączeniem branchy.

Łączcie jedną część naraz. Po zmianie pliku zapiszcie go i odświeżcie stronę. Każdy import wykonujcie na znanym stanie. Dla błędu najpierw wywołajcie status, potem import, potem status. Nie odświeżajcie strony między tymi trzema czynnościami, bo reset ukryłby to, czy odmowa zachowała dane.

Próby: urwany JSON `{`, poprawny JSON z wersją 99, tekstowa energia, null, pusty string, anulowany prompt. Oczekiwany wynik: odmowa i poprzedni stan. Poprawny pakiet odtwarza wszystkie pola, nie tylko pokój. Obce dodatkowe pole nie staje się częścią stanu.

Drugi zespół przechodzi drogę do wygranej i porażki, potem eksportuje i importuje. Konflikt kontraktu rozwiązujcie przez porównanie wymagań i przypadku działania, nie wybór kodu popularniejszej osoby. Zapiszcie konkretną poprawioną usterkę.

## Rozszerzenie albo dopracowanie minimum

Wybierzcie jedno rozszerzenie i jego granicę. Nowe pole oznacza zmianę modelu, walidatora oraz decyzję o formacie zapisu. Nowy pokój może wymagać zmiany reguły wyjścia, nie tylko dopisania nazwy.

Wykonajcie zmianę z rotacją osoby piszącej. Jeśli podstawowe funkcje nie działają, dopracujcie je zamiast dodatku. Nie wracajcie do wymagań serwera lub localStorage.

Ponówcie dotychczasowe próby i nowy przypadek. W TESTY.md zapisujcie wejście, czynność, oczekiwany oraz rzeczywisty wynik. Sam napis „działa” nie pozwala odtworzyć próby.

## Przekazanie

Obcy zespół otrzymuje źródła i README, otwiera HTML dwuklikiem i gra bez pomocy autorów. Instrukcja musi opisać eksport, ręczny zapis pliku i ponowny import. Samo „wczytaj zapis” jest za mało konkretne.

Każdy wykonuje małą indywidualną zmianę lub wyjaśnia otrzymany przypadek. Przykłady: dodatkowa odmowa, inny komunikat, nowe pole wymagające walidacji. Każdy potrafi wskazać, gdzie zapada decyzja, gdzie zmienia się stan i gdzie wypisywany jest tekst.
