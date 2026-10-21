// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.
const MAKS_ENERGIA = 10;
let pokoj = 1;
let energia = MAKS_ENERGIA;
let karta = false;
let bezpiecznik = false;
let zasilanie = false;
let koniec = false;
let wygrana = false;

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  pokoj = 1;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  koniec = false;
  wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia = energia - 1;
  console.log("Pozostala energia: " + energia);
  if (wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (energia === 0) {
    koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  // TODO A1: switch; zwroc nazwe pokoju jako tekst.
  switch(numer) {
    case 1: {
      return "Recepcja";
      break;
    }
    case 2: {
      return "Magazyn";
      break;
    }
    case 3: {
      return "Serwerownia";
      break;
    }
    case 4: {
      return "Wyjscie";
      break;
    }
    default: {
      return "Nieznane pomieszczenie!";
      break;
    }
  }
}
function pomoc() {
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), idz("lewo"), akcja("karta"), akcja("bezpiecznik"), akcja("napraw"), akcja("wyjdz")');
  console.log("Kazdy ruch i akcje kosztuja 1 energie. Ogladanie mapy, pomoc, stan i opisy sa bezplatne. Literówka, ruch w ścianę, ponowne zabranie przedmiotu i akcja bez spełnionych warunków są bezpłatne.")
  console.log("Gdy energia wyniesie zero, UMIERASZ")
  // TODO A5: dopisz pozostale kierunki i akcje oraz zasade kosztu.
}
function status() {
  // TODO A3: wypisz pokoj, energie, przedmioty, zasilanie i stan gry.
  console.log(`Pokoj: ${pokoj}`);
  console.log(`Energia: ${energia} z 10`);
  if(karta && bezpiecznik) {
    console.log(`Przedmiot/y: Karta i Bezpiecznik`);
  }
  else if(karta && !bezpiecznik) {
    console.log(`Przedmiot/y: Karta`);
  }
  else if(!karta && bezpiecznik) {
    console.log(`Przedmiot/y: Bezpiecznik`);
  }
  else {
    console.log(`Przedmiot/y: Brak`);
  }
  console.log("Zasilanie: " + (zasilanie ? "Włączone" : "Wyłączone"));
  console.log("Karta: " + (karta ? "Posiadzasz" : "Brak"));
}
function mapa() {
  // TODO A2: petla for od 1 do 4; nazwa i znacznik aktualnego pokoju.
  for(let i=1;i<=4;i++) {
    if(i == pokoj) {
      console.log(`${i} ${nazwaPokoju(i)} <- Jestes tutaj`)
    }
    else {
      console.log(`${i} ${nazwaPokoju(i)}`)
    }
  }
  
}
function rozejrzyj() {
  // TODO A4: switch(pokoj); opis zgodny ze stanem przedmiotow.
  switch(pokoj) {
    case 1: {
      if(!karta) {
        console.log("Karta lezy na biurku!");
        break;
      }
      else {
        console.log("Nic ciekawego, recepcja swieci pustkami...")
        break;
      }
    }
    case 2: {
      if(!bezpiecznik && !zasilanie) {
        console.log("Na polce lezy przykurzony bezpiecznik, oby jescze dzialal");
        break;
      }
      else {
        console.log("W magazynie widzisz tylko stare kable i komputery");
        break;
      }
    }
    case 3: {
      if(zasilanie) {
        console.log("Zasilanie przywrocone! Juz niedlugo sie wydostaniesz");
        break;
      }
      else {
        console.log("Zasilanie nadal nie dziala...");
        break;
      }
    }
    case 4: {
      console.log("Do wyjscia potrzebujesz karty i dzialajacego zasilania, gotowy?");
      break;
    }
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
  // TODO B1: zablokuj ruch po koncu gry.
  if(koniec){
    console.log("Gra zakonczona");
    return 
  }
  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.
  let nastepnyPokoj = pokoj
  switch(kierunek){
    case "prawo":
      nastepnyPokoj++
      break
    case "lewo":
      nastepnyPokoj--
      break
    default:
      console.log("Podaj kierunek 'prawo' lub 'lewo'");
      return
  }
  
  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.
  if(nastepnyPokoj<1 || nastepnyPokoj>4) return
  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  pokoj = nastepnyPokoj
  
  rozejrzyj()
  zakonczTure()
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  // TODO C1: zablokuj akcje po koncu gry.
  if(koniec){
    console.log("Gra zakonczona");
    return 
  }
  // TODO C2: switch: karta / bezpiecznik / napraw / wyjdz.
  // TODO C2: przed zmiana sprawdz pokoj i wymagany stan.
  switch(co){
    case "karta":
      if (pokoj !== 1 || karta) {
      console.log("Tutaj nie ma karty do zabrania.");
      return;
      }
      karta = true;
      console.log("Zabierasz karte.");
      break;

      case "bezpiecznik":
        if(pokoj!==2 || bezpiecznik){
        console.log("Tutaj nie ma bezpiecznika do zabrania.");
        return;
        }
        bezpiecznik = true
        console.log("Zabierasz bezpiecznik.");
        break;

        case "napraw":
          if(pokoj!==3 || !bezpiecznik || zasilanie){
            console.log(`Nie mozna wykonac zadania${zasilanie ? " - Zasilanie dziala" : !bezpiecznik ? " - Nie masz bezpiecznika" : ""}`)
            return
          }
          console.log("Naprawa wykonana");
          
          bezpiecznik = false
          zasilanie = true
          break

        case "wyjdz":
          if(pokoj!==4 || !karta || !zasilanie){
              console.log(`Nie mozna wyjsc${!karta ? " - Nie masz karty" : !zasilanie ? " - Zasilanie nie dziala": ""}`)
              return
          }
          wygrana = true
          koniec = true
          break

        default:
          console.log("Nie ma takiej akcji")
          pomoc();
          return; 
          
  }
  // TODO C3: przy odrzuceniu return; przy sukcesie break.
  // TODO C3: po switch jedno zakonczTure().
  zakonczTure()
  // TODO C4: wygrana i koniec ustawione przed rozliczeniem tury!
}

start();
