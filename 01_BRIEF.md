# JS1 — Ucieczka 2: gra, którą da się rozwijać i przenosić

Macie działającą pierwszą grę. Rozbudujcie jej konstrukcję tak, żeby reguły można było zmieniać bez mieszania ich z komunikatami i żeby gracz mógł zachować postęp w tekście JSON. Czas: 6 × 45 minut. Zespół: 2–3 osoby. Grafiki nie są potrzebne.

## Środowisko

Otwieracie index.html dwuklikiem. Gra działa w konsoli przeglądarki. Zwykłe skrypty engine.js i app.js są ładowane w tej kolejności przez dwa elementy script z defer. Bez Node, npm, serwera, modułów ES, fetch i localStorage. Sam podział plików nie izoluje zmiennych; jest podziałem odpowiedzialności.

## Obowiązkowy rezultat

1. Stan rozgrywki w obiekcie, a dane pomieszczeń w kolekcji.
2. Funkcja reguł otrzymuje stan i komendę, oddaje wynik {stan, komunikat}, nie mutuje wejścia i nie wypisuje komunikatów. Aplikacja osobno przyjmuje wynik i go pokazuje.
3. Ruch, przedmiot, działanie wymagające przedmiotu, wygrana, porażka i reset. Znane zasady pierwszej gry pozostają punktem odniesienia.
4. Uzgodnione polecenia konsolowe zgrupowane w gra. Nie wymagamy prywatnego stanu; zwykłe skrypty współdzielą środowisko strony.
5. Eksport zwraca tekst JSON z numerem wersji i stanem. Nie zapisuje pliku automatycznie. Użytkownik kopiuje tekst do edytora i zapisuje plik na pendrivie.
6. Import przyjmuje tekst JSON. Sprawdza składnię, wersję, typy, zakresy i uzgodnione zależności. Dopiero po przyjęciu całości podmienia stan. Błąd i anulowanie nie zmieniają rozgrywki.
7. README, minimum sześć udokumentowanych prób oraz jedna krótka decyzja z rozważoną alternatywą. Przekazanie tekstu do pliku i z powrotem jest częścią instrukcji.

## Kryteria odbioru

| Sytuacja | Działanie | Oczekiwany wynik |
|---|---|---|
| Lewa granica mapy | Ruch w lewo | Stan i energia bez zmian, komunikat ściany |
| Przedmiot już zabrany | Ponowne pobranie | Brak duplikatu i kosztu |
| Właściwe miejsce i przedmiot | Naprawa | Zmiana zasilania, zużycie przedmiotu i jednej energii |
| Postęp wyeksportowany i ręcznie zapisany | Odświeżenie, wklejenie zawartości pliku do importu | Odtworzenie dokładnie zapisanych danych |
| Aktywna rozgrywka | Import urwanego JSON | Komunikat błędu, stan bez zmian |
| Poprawna składnia, zła wersja lub typ pola | Import | Odrzucenie całości bez częściowej podmiany |
| Brak tekstu lub anulowane okno | Import | Czytelna odmowa i stan bez zmian |
| Jedna energia i warunki zwycięstwa | Otwarcie wyjścia | Wygrana ma pierwszeństwo przed porażką |
| Zakończona gra | Ruch lub akcja | Brak zmiany; reset i eksport nadal działają |
| Poprawny stan wejściowy | Wywołanie funkcji reguł | Oryginał pozostaje niezmieniony |

## Własne pomysły

Po minimum wybierzcie najwyżej jedno większe rozszerzenie: nowy pokój, historia komend, inny poziom trudności, alternatywne zakończenie. Opiszcie jego kryterium i wpływ na zapis. Nie dodajemy instalacji ani API wymagających serwera. Jeżeli rozszerzacie model, dostosujcie walidator i wersję formatu.

## Współpraca i pomoc

01_BRIEF określa rezultat, 02_TECH proponuje kontrakt, 03_PROWADZENIE pomaga etapami. Wszystkie pliki są dostępne od początku, bez kar za korzystanie z podpowiedzi. Każda droga obejmuje krótki plan i próby. Role obracają się między implementacją, przeglądem i integracją. W połowie pokażcie jeden wspólny działający przebieg. Na koniec każdy objaśnia cudzy fragment i wykonuje małą własną zmianę.
