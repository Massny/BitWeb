# BitNobel      

Aplikacja webowa umożliwiająca wyświetlanie danych o nagrodach nobla przyznanych w danym roku, przy użyciu [Nobelprize.org API](https://www.nobelprize.org/about/developer-zone-2/).      

Zadanie rekrutacyjne w ramach konkursu sekcji Bit WEB koła naukowego Bit.      

By Paweł Fornagiel     


## Prerequisites 
Przed rozpoczęciem instalacji upewnij się, że w twoim środowisku zainstalowane są:     

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (zawarte w Node.js)

   

## Instrukcja Instalacji Aplikacji      
    
1. **Sklonuj repozytorium GitHub**  
W wybranym przez siebie folderze otwórz terminal i użyj następującego polecenia:

   ```javascript
   git clone https://github.com/Massny/BitWeb.git
   ```

2. **Przejdź do katalogu projektu:**  
Używając terminala przejdź do nowo utworzonego katalogu:

   ```javascript
   cd BitWeb
   ```

3. **Zainstaluj wymagane pakiety:**  
Wykonaj poniższe polecenie, aby dokończyć instalację apliakcji:

   ```javascript
   npm install
   ```
  
## Uruchomienie aplikacji  

Po instalacji możesz uruchomić aplikację lokalnie. Otwórz terminal w katalogu aplikacji i użyj następującego polecenia:

   ```javascript
   npm run dev 
   ```

Po jego wykonaniu zostanie uruchomiony serwer deweloperski. Teraz wystarczy, że w przeglądarce odwiedzisz adres http://localhost:5173 i możesz cieszyć się działaniem BitNobla!  

## Tworzenie builda

Aby utworzyć zoptymalizowany build projektu, w katalogu BitWeb użyj polecnia:    

   ```javascript
   npm run build 
   ```

Build zostanie utworzony w katalogu 'dist' w folderze projektu. 

Aby w prosty sposób uruchomić build na swoim komputerze, można użyć narzędzia [serve](https://www.npmjs.com/package/serve) przez wykonanie następujących poleceń w katalogu projektu:

   ```javascript
   npm install -g serve
   serve -s dist
   ```

Aplikacja stanie się dostępna pod URL widocznym w terminalu.

## Trochę o mnie       

Jestem pierwszoroczniakiem na kierunku Informatyka. Przed studiami miałem trochę doświadczenia z WebDevem - interesowałem się tematem, tworzyłem osobiste projekty wspólnie ze znajomymi oraz w ramach praktyk zawodowych. Mam doświadczenie w pracy z użyciem min. TypeScripta, Reacta, Pythona, Node.JS oraz baz danych SQL. Chciałbym spróbować swoich sił będąc częścią nieco większego niż dotychczas zespołu oraz przyczynić się do powstawania wspaniałego Enrolla 2.0. 