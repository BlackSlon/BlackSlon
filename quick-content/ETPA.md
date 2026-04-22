# ENERGY TOKENIZATION PURCHASE AGREEMENT
## ETPA - Umowa o Zakup Energii w Celu Tokenizacji

---

> **Dokument poufny - wersja robocza**
> Niniejsza umowa stanowi wzorzec przeznaczony do negocjacji z Dostawca.
> Wersja: 1.0 · Data: ..................................

---

## PREAMBU\u0141A

Niniejsza umowa (,,**Umowa**") zostaje zawarta pomi\u0119dzy:

**STRON\u0104 A** - producentem, agregatorem lub operatorem energetycznym posiadaj\u0105cym licencj\u0119 na obr\u00f3t energia elektryczn\u0105 i/lub gazem ziemnym na rynku hurtowym w rozumieniu w\u0142a\u015bciwych przepis\u00f3w unijnych i krajowych (,,**Dostawca**"),

oraz

**STRON\u0104 B** - BlackSlon Protocol Foundation, podmiotem prowadz\u0105cym otwarty protok\u00f3\u0142 tokenizacji warto\u015bci ekonomicznej energii, dzia\u0142aj\u0105cym jako cyfrowy custodian aktyw\u00f3w energetycznych (,,**Tokenizator**").

---

Strony ustalaj\u0105, \u017ce niniejsza Umowa **nie stanowi** umowy sprzeda\u017cy energii elektrycznej w rozumieniu Dyrektywy 2019/944/WE ani umowy dostawy gazu w rozumieniu Dyrektywy 2009/73/WE.

Tokenizator nabywa wy\u0142\u0105cznie **ekonomiczn\u0105 warto\u015b\u0107** wolumenu energetycznego okre\u015blonego w Harmonogramie A, w celu emisji cyfrowych token\u00f3w reprezentuj\u0105cych t\u0119 warto\u015b\u0107 na platformie BlackSlon Protocol. Fizyczna dostawa energii do Tokenizatora nie jest przedmiotem niniejszej Umowy i nie jest przez ni\u0105 przewidziana w \u017cadnych okoliczno\u015bciach.

---

## CZ\u0118\u015a\u0106 I - DEFINICJE

**,,Wolumen Referencyjny"** oznacza ilo\u015b\u0107 energii elektrycznej lub gazu ziemnego (wyra\u017con\u0105 w MWh lub MWh-ekwiwalencie gazu) stanowi\u0105c\u0105 podstaw\u0119 do emisji Token\u00f3w Energetycznych w danym Okresie Rozliczeniowym, okre\u015blon\u0105 w Harmonogramie A. Wolumen Referencyjny nie jest przedmiotem fizycznej dostawy do Tokenizatora.

**,,Cena Referencyjna"** oznacza cen\u0119 hurtow\u0105 energii na w\u0119\u017ale rozliczeniowym wskazanym w Harmonogramie A (np. EPEX Spot DE-LU dla energii elektrycznej, TTF dla gazu ziemnego), publikowan\u0105 przez wskazan\u0105 izb\u0119 rozliczeniow\u0105 lub gie\u0142d\u0119 towarow\u0105, s\u0142u\u017c\u0105c\u0105 jako punkt odniesienia dla wyceny Tokenu Energetycznego i rozliczenia finansowego mi\u0119dzy Stronami.

**,,Strike Price"** oznacza cen\u0119 ustalon\u0105 przez Strony w Harmonogramie A, s\u0142u\u017c\u0105c\u0105 jako sta\u0142a warto\u015b\u0107 referencyjna w mechanizmie Contract for Differences. Strike Price mo\u017ce by\u0107 sta\u0142y przez ca\u0142y okres obowi\u0105zywania Umowy lub podlega\u0107 eskalacji zgodnie z zasadami okre\u015blonymi w Harmonogramie A.

**,,Token Energetyczny"** oznacza cyfrowy instrument protoko\u0142u BlackSlon reprezentuj\u0105cy ekonomiczn\u0105 warto\u015b\u0107 1 MWh Wolumenu Referencyjnego, emitowany przez Tokenizatora na podstawie niniejszej Umowy po potwierdzeniu Proof of Reserve.

**,,Corridor Cenowy"** oznacza przedzia\u0142 cenowy (warto\u015b\u0107 minimalna Floor i warto\u015b\u0107 maksymalna Cap, wyra\u017cone w EUR/MWh), w ramach kt\u00f3rego Protok\u00f3\u0142 utrzymuje stabilno\u015b\u0107 warto\u015bci Tokenu Energetycznego poprzez mechanizmy okre\u015blone w Whitepaper Protoko\u0142u.

**,,Proof of Reserve"** oznacza automatyczn\u0105 weryfikacj\u0119 onchain, wykonywan\u0105 przez system wyroczni Protoko\u0142u, potwierdzaj\u0105c\u0105 w czasie rzeczywistym, \u017ce:
- suma wyemitowanych i nieumorzonych Token\u00f3w Energetycznych nie przekracza skumulowanego Wolumenu Referencyjnego z aktywnych um\u00f3w ETPA, oraz
- Tokenizator utrzymuje rezerwy got\u00f3wkowe lub ich ekwiwalenty w wysoko\u015bci co najmniej **100%** bie\u017c\u0105cej warto\u015bci wyemitowanych token\u00f3w obliczonej wed\u0142ug Ceny Referencyjnej.

**,,Charge Detail Record (CDR) Energetyczny"** oznacza elektroniczny dokument generowany przez Dostawc\u0119 po zako\u0144czeniu ka\u017cdego Okresu Rozliczeniowego, zawieraj\u0105cy dane o wolumenie energii wprowadzonej do sieci, godzinowe profile produkcji, odczyty z punkt\u00f3w pomiarowych oraz warto\u015b\u0107 rozliczenia finansowego CfD za dany okres.

**,,Redemption"** oznacza prawo holdera Tokenu Energetycznego do umorzenia tokenu i otrzymania \u015bwiadczenia pieni\u0119\u017cnego obliczonego wed\u0142ug Ceny Referencyjnej obowi\u0105zuj\u0105cej w dacie z\u0142o\u017cenia wniosku, realizowanego przez Tokenizatora w terminie **T+2 dni roboczych**.

**,,Okres Rozliczeniowy"** oznacza miesi\u0119czny okres kalendarzowy, po up\u0142ywie kt\u00f3rego nast\u0119puje finansowe rozliczenie r\u00f3\u017cnicy mi\u0119dzy Cen\u0105 Referencyjn\u0105 a Strike Price oraz emisja Token\u00f3w Energetycznych za ten okres.

**,,Segregowane Konto Zabezpieczaj\u0105ce"** oznacza dedykowany rachunek bankowy lub pozycj\u0119 w smart contractach Protoko\u0142u, na kt\u00f3rym Tokenizator przechowuje rezerwy pokrywaj\u0105ce wyemitowane tokeny, prawnie oddzielony od kapita\u0142u operacyjnego BlackSlon Protocol Foundation.

---

## CZ\u0118\u015a\u0106 II - MECHANIZM FINANSOWY

### Artyku\u0142 2.1 - Struktura zakupu - Contract for Differences

Strony zawieraj\u0105 finansow\u0105 umow\u0119 r\u00f3\u017cnicow\u0105 (**Contract for Differences**) opart\u0105 na mechanizmie fixed-for-floating swap, na nast\u0119puj\u0105cych zasadach:

Dostawca wprowadza energi\u0119 odpowiadaj\u0105c\u0105 Wolumenowi Referencyjnemu do sieci elektroenergetycznej lub gazowej i sprzedaje j\u0105 na rynku hurtowym po Cenie Referencyjnej. Fizyczne przep\u0142ywy energii s\u0105 ca\u0142kowicie oddzielone od finansowych rozlicze\u0144 mi\u0119dzy Stronami.

Po zako\u0144czeniu ka\u017cdego Okresu Rozliczeniowego Strony ustalaj\u0105 wynik finansowy wed\u0142ug formu\u0142y:

```
Wynik CfD = (Cena Referencyjna - Strike Price) \u00d7 Wolumen Referencyjny
```

- Je\u017celi **Cena Referencyjna > Strike Price**: Dostawca wyp\u0142aca Tokenizatorowi kwot\u0119 odpowiadaj\u0105c\u0105 tej r\u00f3\u017cnicy przemno\u017conej przez Wolumen Referencyjny.
- Je\u017celi **Cena Referencyjna < Strike Price**: Tokenizator wyp\u0142aca Dostawcy kwot\u0119 odpowiadaj\u0105c\u0105 tej r\u00f3\u017cnicy przemno\u017conej przez Wolumen Referencyjny, zapewniaj\u0105c Dostawcy gwarantowany przych\u00f3d na poziomie Strike Price za ka\u017cdy MWh Wolumenu Referencyjnego.

---

### Artyku\u0142 2.2 - Zabezpieczenie i segregacja aktyw\u00f3w

Tokenizator zobowi\u0105zuje si\u0119 do utrzymywania rezerw finansowych pokrywaj\u0105cych w ka\u017cdym momencie co najmniej **100%** bie\u017c\u0105cej warto\u015bci wyemitowanych i nieumorzonych Token\u00f3w Energetycznych, obliczonej jako iloczyn liczby token\u00f3w i aktualnej Ceny Referencyjnej.

Rezerwy przechowywane s\u0105 wy\u0142\u0105cznie na **Segregowanym Koncie Zabezpieczaj\u0105cym**, prawnie oddzielonym od kapita\u0142u operacyjnego Tokenizatora. \u015arodki te nie mog\u0105 by\u0107 u\u017cywane do:
- finansowania dzia\u0142alno\u015bci operacyjnej,
- inwestycji spekulacyjnych,
- zabezpieczania jakichkolwiek zobowi\u0105za\u0144 innych ni\u017c wynikaj\u0105ce z niniejszej Umowy i warunk\u00f3w Redemption.

Stan rezerw jest weryfikowany automatycznie przez system **Proof of Reserve** w czasie rzeczywistym i publikowany onchain w spos\u00f3b umo\u017cliwiaj\u0105cy weryfikacj\u0119 przez ka\u017cd\u0105 zainteresowan\u0105 stron\u0119 bez konieczno\u015bci uzyskania zgody Tokenizatora.

W przypadku gdy Proof of Reserve wyka\u017ce poziom pokrycia poni\u017cej 100%, Protok\u00f3\u0142 automatycznie **wstrzymuje emisj\u0119 nowych Token\u00f3w Energetycznych** do czasu uzupe\u0142nienia rezerw do wymaganego poziomu.

---

### Artyku\u0142 2.3 - Corridor Cenowy Protoko\u0142u

Protok\u00f3\u0142 utrzymuje Corridor Cenowy zdefiniowany przez warto\u015b\u0107 **Floor** (dolna granica) i **Cap** (g\u00f3rna granica), okre\u015blone w Harmonogramie B jako procentowe odchylenie od Strike Price.

| Zdarzenie | Mechanizm |
|-----------|-----------|
| Cena Referencyjna poni\u017cej Floor przez **3 kolejne dni robocze** | Protok\u00f3\u0142 aktywuje skup Token\u00f3w Energetycznych z rynku wt\u00f3rnego ze \u015brodk\u00f3w funduszu stabilizacyjnego |
| Cena Referencyjna powy\u017cej Cap przez **3 kolejne dni robocze** | Protok\u00f3\u0142 ogranicza emisj\u0119 nowych Token\u00f3w Energetycznych do poziomu zatwierdzonego przez mechanizm zarz\u0105dzania |

---

## CZ\u0118\u015a\u0106 III - EMISJA TOKEN\u00d3W ENERGETYCZNYCH

### Artyku\u0142 3.1 - Warunki i harmonogram emisji

Emisja Token\u00f3w Energetycznych nast\u0119puje po \u0142\u0105cznym spe\u0142nieniu nast\u0119puj\u0105cych warunk\u00f3w:

1. Dostarczenie przez Dostawc\u0119 **CDR Energetycznego** za zako\u0144czony Okres Rozliczeniowy,
2. Rozliczenie finansowe **CfD** za ten okres,
3. Potwierdzenie przez **Proof of Reserve**, \u017ce planowana emisja nie spowoduje przekroczenia poziomu pokrycia rezerw poni\u017cej 100%.

Wolumen emisji wynosi **jeden Token Energetyczny na ka\u017cdy MWh** Wolumenu Referencyjnego zrealizowanego w danym Okresie Rozliczeniowym. \u0141\u0105czna suma wyemitowanych i nieumorzonych Token\u00f3w Energetycznych nie mo\u017ce w \u017cadnym momencie przekroczy\u0107 skumulowanego Wolumenu Referencyjnego ze wszystkich aktywnych um\u00f3w ETPA.

Emisja nast\u0119puje w terminie nie d\u0142u\u017cszym ni\u017c **5 dni roboczych** od zako\u0144czenia Okresu Rozliczeniowego i spe\u0142nienia powy\u017cszych warunk\u00f3w.

---

### Artyku\u0142 3.2 - Redemption

Ka\u017cdy holder Tokenu Energetycznego ma prawo w dowolnym momencie z\u0142o\u017cy\u0107 wniosek o Redemption dowolnej liczby posiadanych token\u00f3w.

Tokenizator realizuje Redemption w terminie **T+2 dni roboczych** od daty z\u0142o\u017cenia wniosku, wyp\u0142acaj\u0105c holderowi:

```
Kwota Redemption = Liczba token\u00f3w \u00d7 Cena Referencyjna (z dnia wniosku)
                   - Op\u0142ata za Redemption (wg Cennika Protoko\u0142u)
```

**Redemption ma bezwzgl\u0119dne pierwsze\u0144stwo** przed wszelkimi innymi zobowi\u0105zaniami finansowymi Tokenizatora. Tokenizator nie mo\u017ce odm\u00f3wi\u0107 realizacji Redemption ani odroczy\u0107 jej terminu z powod\u00f3w innych ni\u017c udokumentowane zdarzenia Force Majeure lub nakaz w\u0142a\u015bciwego organu regulacyjnego.

Wyp\u0142ata nast\u0119puje w **EUR** lub zatwierdzonych przez Protok\u00f3\u0142 walutach cyfrowych (USDC, EURC lub ich odpowiednikach zatwierdzonych przez mechanizm zarz\u0105dzania Protoko\u0142u). Wyp\u0142ata w formie fizycznej dostawy energii jest **wykluczona**.

---

## CZ\u0118\u015a\u0106 IV - PRAWA I OBOWI\u0104ZKI STRON

### Artyku\u0142 4.1 - Obowi\u0105zki Dostawcy

**a) Licencje i autoryzacje**
Dostawca zobowi\u0105zuje si\u0119 do utrzymywania wa\u017cnych licencji i autoryzacji wymaganych do prowadzenia obrotu energi\u0105 na rynku hurtowym przez ca\u0142y okres obowi\u0105zywania Umowy. Utrata licencji przez Dostawc\u0119 stanowi podstaw\u0119 do rozwi\u0105zania Umowy przez Tokenizatora ze skutkiem natychmiastowym.

**b) Dane produkcyjne w czasie rzeczywistym**
Dostawca zobowi\u0105zuje si\u0119 do dostarczania danych produkcyjnych poprzez API feed zintegrowany z systemem wyroczni Protoko\u0142u, umo\u017cliwiaj\u0105cy automatyczn\u0105 weryfikacj\u0119 Wolumenu Referencyjnego bez ujawniania szczeg\u00f3\u0142owych warunk\u00f3w handlowych Umowy wobec os\u00f3b trzecich.

**c) CDR Energetyczny**
Dostawca zobowi\u0105zuje si\u0119 do dostarczania CDR Energetycznego w terminie nie d\u0142u\u017cszym ni\u017c **3 dni robocze** po zako\u0144czeniu ka\u017cdego Okresu Rozliczeniowego, zawieraj\u0105cego:
- godzinowe profile produkcji,
- dane pomiarowe z akredytowanych punkt\u00f3w pomiaru,
- kalkulacj\u0119 rozliczenia finansowego CfD.

**d) Rozliczenie finansowe CfD**
Rozliczenie nast\u0119puje w terminie **T+3 dni roboczych** po dostarczeniu CDR Energetycznego. Op\u00f3\u017anienie w p\u0142atno\u015bci skutkuje naliczeniem odsetek w wysoko\u015bci **EURIBOR 3M + 2 pp** w skali rocznej.

**e) Powiadomienia**
Dostawca zobowi\u0105zuje si\u0119 do powiadamiania Tokenizatora w terminie **24 godzin** o wszelkich zdarzeniach mog\u0105cych wp\u0142yn\u0105\u0107 na realizacj\u0119 Wolumenu Referencyjnego, w tym awariach instalacji, ograniczeniach sieciowych, zdarzeniach Force Majeure oraz post\u0119powaniach regulacyjnych dotycz\u0105cych licencji Dostawcy.

---

### Artyku\u0142 4.2 - Obowi\u0105zki Tokenizatora

**a) Proof of Reserve**
Tokenizator zobowi\u0105zuje si\u0119 do utrzymywania Proof of Reserve na poziomie co najmniej **100%** w ka\u017cdym momencie trwania Umowy oraz do natychmiastowej publikacji wynik\u00f3w weryfikacji onchain.

**b) Realizacja Redemption**
Tokenizator zobowi\u0105zuje si\u0119 do realizacji Redemption na warunkach okre\u015blonych w Artykule 3.2 bez zb\u0119dnej zw\u0142oki i bez nak\u0142adania warunk\u00f3w nieprzewidzianych niniejsz\u0105 Umow\u0105.

**c) Limit emisji**
Tokenizator zobowi\u0105zuje si\u0119 do nieprzekraczania wolumenu emisji Token\u00f3w Energetycznych ponad skumulowany Wolumen Referencyjny ze wszystkich aktywnych um\u00f3w ETPA, niezale\u017cnie od popytu rynkowego na tokeny.

**d) Audyt niezale\u017cny**
Tokenizator zobowi\u0105zuje si\u0119 do zlecenia **corocznego niezale\u017cnego audytu** rezerw finansowych i mechanizm\u00f3w Proof of Reserve, przeprowadzanego przez podmiot akredytowany, oraz do publikacji raportu audytowego w terminie **30 dni** od jego otrzymania.

**e) Obowi\u0105zki raportowe EMIR**
Tokenizator zobowi\u0105zuje si\u0119 do wype\u0142nienia obowi\u0105zk\u00f3w raportowych wynikaj\u0105cych z regulacji EMIR w zakresie, w jakim Umowa kwalifikuje si\u0119 jako instrument pochodny w rozumieniu tych regulacji, lub do zawarcia z Dostawc\u0105 osobnego porozumienia w przedmiocie delegacji tych obowi\u0105zk\u00f3w.

---

### Artyku\u0142 4.3 - Wy\u0142\u0105czenia - zakres dzia\u0142alno\u015bci Tokenizatora

Strony potwierdzaj\u0105 i Tokenizator zobowi\u0105zuje si\u0119, \u017ce w zwi\u0105zku z niniejsz\u0105 Umow\u0105 **nie**:
- nabywa fizycznej energii elektrycznej ani gazu ziemnego,
- dzia\u0142a jako podmiot bilansuj\u0105cy ani uczestnik rynku bilansuj\u0105cego w rozumieniu przepis\u00f3w o rynku energii,
- odsprzedaje energii odbiorcom ko\u0144cowym w rozumieniu przepis\u00f3w o sprzeda\u017cy energii,
- posiada i zarz\u0105dza infrastruktur\u0105 przesy\u0142ow\u0105, dystrybucyjn\u0105 ani magazynow\u0105.

Wszelkie roszczenia holder\u00f3w Token\u00f3w Energetycznych maj\u0105 wy\u0142\u0105cznie charakter **finansowy** i s\u0105 realizowane w walucie fiducjarnej lub zatwierdzonym ekwiwalencie cyfrowym - **nigdy w formie fizycznej dostawy energii**.

---

## CZ\u0118\u015a\u0106 V - KLAUZULE SZCZEG\u00d3LNE

### Artyku\u0142 5.1 - Transparentno\u015b\u0107 danych

Dostawca wyra\u017ca zgod\u0119 na publikacj\u0119 **zagregowanych danych** o Wolumenie Referencyjnym onchain w spos\u00f3b uniemo\u017cliwiaj\u0105cy identyfikacj\u0119 szczeg\u00f3\u0142owych warunk\u00f3w handlowych Umowy, w szczeg\u00f3lno\u015bci Strike Price i to\u017csamo\u015bci Dostawcy, chyba \u017ce Dostawca wyrazi odr\u0119bn\u0105 zgod\u0119 na ujawnienie tych danych.

Dostawca wyra\u017ca zgod\u0119 na weryfikacj\u0119 danych produkcyjnych przez system wyroczni Protoko\u0142u (Chainlink lub r\u00f3wnowa\u017cny) bez prawa do wgl\u0105du wyroczni w szczeg\u00f3\u0142owe warunki handlowe Umowy. Techniczne parametry integracji API zostan\u0105 okre\u015blone w **Aneksie Technicznym** stanowi\u0105cym integraln\u0105 cz\u0119\u015b\u0107 Umowy.

---

### Artyku\u0142 5.2 - Klauzula adaptacji regulacyjnej

W przypadku zmiany klasyfikacji regulacyjnej Token\u00f3w Energetycznych przez w\u0142a\u015bciwy organ (ESMA, krajowy regulator energetyczny lub finansowy, lub inny organ w\u0142a\u015bciwy w \u015bwietle przepis\u00f3w obowi\u0105zuj\u0105cych w jurysdykcji kt\u00f3rejkolwiek ze Stron), Strony zobowi\u0105zuj\u0105 si\u0119 do podj\u0119cia negocjacji w przedmiocie dostosowania warunk\u00f3w Umowy w terminie **90 dni** od daty oficjalnej klasyfikacji, w celu zapewnienia zgodno\u015bci z obowi\u0105zuj\u0105cym prawem przy zachowaniu ekonomicznego celu Umowy.

Je\u017celi dostosowanie do nowych wymog\u00f3w regulacyjnych jest niemo\u017cliwe lub wi\u0105\u017ca\u0142oby si\u0119 z kosztami nieproporcjonalnie obci\u0105\u017caj\u0105cymi kt\u00f3r\u0105kolwiek ze Stron, ka\u017cda ze Stron ma prawo do rozwi\u0105zania Umowy z zachowaniem **90-dniowego okresu wypowiedzenia**, bez obowi\u0105zku wyp\u0142aty odszkodowania z tego tytu\u0142u.

---

### Artyku\u0142 5.3 - Pierwsze\u0144stwo Redemption nad innymi zobowi\u0105zaniami

Strony wyra\u017anie potwierdzaj\u0105, \u017ce \u015brodki zgromadzone na Segregowanym Koncie Zabezpieczaj\u0105cym s\u0105 przeznaczone **wy\u0142\u0105cznie** na realizacj\u0119 Redemption i rozliczenie z Dostawc\u0105, i nie mog\u0105 stanowi\u0107 przedmiotu egzekucji na rzecz wierzycieli Tokenizatora innych ni\u017c:
- holderzy Token\u00f3w Energetycznych, oraz
- Dostawca z tytu\u0142u niniejszej Umowy.

Tokenizator podejmie wszelkie prawnie dost\u0119pne dzia\u0142ania w celu prawnego ugruntowania tej ochrony w jurysdykcji swojej siedziby, w szczeg\u00f3lno\u015bci poprzez ustanowienie zastawu rejestrowego lub r\u00f3wnowa\u017cnej formy zabezpieczenia na Segregowanym Koncie Zabezpieczaj\u0105cym na rzecz holder\u00f3w token\u00f3w, reprezentowanych przez fundacj\u0119 lub powiernika wyznaczonego przez mechanizm zarz\u0105dzania Protoko\u0142u.

---

### Artyku\u0142 5.4 - Zakaz cesji bez zgody

\u017badna ze Stron nie mo\u017ce dokona\u0107 cesji praw lub obowi\u0105zk\u00f3w wynikaj\u0105cych z niniejszej Umowy bez uprzedniej pisemnej zgody drugiej Strony.

Wyj\u0105tek stanowi cesja przez Dostawc\u0119 na rzecz podmiotu przejmuj\u0105cego ca\u0142o\u015b\u0107 lub zorganizowan\u0105 cz\u0119\u015b\u0107 jego przedsi\u0119biorstwa energetycznego, pod warunkiem \u017ce podmiot przejmuj\u0105cy spe\u0142nia wymagania dotycz\u0105ce posiadania licencji, o kt\u00f3rych mowa w Artykule 4.1.

---

## CZ\u0118\u015a\u0106 VI - POSTANOWIENIA KO\u0143COWE

### Artyku\u0142 6.1 - Prawo w\u0142a\u015bciwe i jurysdykcja

Umowa podlega prawu wskazanemu w **Harmonogramie A**. Wszelkie spory wynikaj\u0105ce z Umowy lub z ni\u0105 zwi\u0105zane b\u0119d\u0105 rozstrzygane przez s\u0105d arbitra\u017cowy wskazany w Harmonogramie A, zgodnie z jego regulaminem obowi\u0105zuj\u0105cym w dacie wszcz\u0119cia post\u0119powania, chyba \u017ce Strony uzgodni\u0105 inne forum rozwi\u0105zywania spor\u00f3w.

---

### Artyku\u0142 6.2 - Force Majeure

\u017badna ze Stron nie ponosi odpowiedzialno\u015bci za niewykonanie lub nienale\u017cycie wykonanie zobowi\u0105za\u0144 wynikaj\u0105cych z Umowy w zakresie, w jakim niewykonanie to jest spowodowane zdarzeniami pozostaj\u0105cymi poza rozs\u0105dn\u0105 kontrol\u0105 danej Strony, w tym:

- kl\u0119skami \u017cywio\u0142owymi,
- wojn\u0105, aktami terroryzmu,
- awariami infrastruktury krytycznej,
- decyzjami organ\u00f3w w\u0142adzy publicznej,
- powa\u017cnymi awariami sieci blockchain uniemo\u017cliwiaj\u0105cymi funkcjonowanie Protoko\u0142u.

Strona dotkni\u0119ta zdarzeniem Force Majeure zobowi\u0105zana jest do niezw\u0142ocznego powiadomienia drugiej Strony oraz do podj\u0119cia wszelkich rozs\u0100dnych dzia\u0142a\u0144 zmierzaj\u0105cych do ograniczenia skutk\u00f3w tego zdarzenia.

---

### Artyku\u0142 6.3 - Kompletno\u015b\u0107 Umowy

Niniejsza Umowa wraz z **Harmonogramami A i B** oraz **Aneksem Technicznym** stanowi ca\u0142o\u015b\u0107 porozumienia Stron w przedmiocie obj\u0119tym jej zakresem i zast\u0119puje wszelkie wcze\u015bniejsze ustalenia, negocjacje i porozumienia Stron dotycz\u0105ce tego przedmiotu, zarówno pisemne jak i ustne.

---

## HARMONOGRAM A - PARAMETRY WOLUMENU I ROZLICZENIA

| Parametr | Warto\u015b\u0107 |
|----------|---------|
| Rodzaj energii | .................. *(energia elektryczna / gaz ziemny)* |
| Wolumen Referencyjny miesi\u0119czny | .................. MWh |
| W\u0119ze\u0142 rozliczeniowy | .................. *(np. EPEX Spot DE-LU / TTF)* |
| Strike Price | .................. EUR/MWh |
| Eskalacja Strike Price | .................. % rocznie *(0% = cena sta\u0142a)* |
| Okres obowi\u0105zywania Umowy | .................. miesi\u0119cy |
| Opcja przed\u0142u\u017cenia | .................. *(tak / nie - warunki w Aneksie 1)* |
| Prawo w\u0142a\u015bciwe | .................. |
| S\u0105d arbitra\u017cowy | .................. |

---

## HARMONOGRAM B - CORRIDOR CENOWY I MECHANIZM STABILIZACJI

| Parametr | Warto\u015b\u0107 |
|----------|---------|
| Floor (warto\u015b\u0107 minimalna) | .................. EUR/MWh |
| Cap (warto\u015b\u0107 maksymalna) | .................. EUR/MWh |
| Cz\u0119stotliwo\u015b\u0107 rewizji Corridor | co .................. miesi\u0119cy |
| Pr\u00f3g rewizji ad hoc | odchylenie Ceny Referencyjnej powy\u017cej .................. % od Strike Price przez .................. kolejnych dni roboczych |

**Mechanizm stabilizacji Floor:** skup token\u00f3w z rynku wt\u00f3rnego ze \u015brodk\u00f3w funduszu stabilizacyjnego Protoko\u0142u - parametry zgodne z Whitepaper Protoko\u0142u w wersji obowi\u0105zuj\u0105cej w dacie zawarcia Umowy.

**Mechanizm stabilizacji Cap:** ograniczenie emisji nowych token\u00f3w do wolumenu zatwierdzonego przez mechanizm zarz\u0105dzania Protoko\u0142u.

---

## PODPISY

Umowa sporz\u0105dzona w dw\u00f3ch jednobrzmi\u0105cych egzemplarzach, po jednym dla ka\u017cdej ze Stron.

&nbsp;

**Za Dostawc\u0119:**

Imi\u0119 i nazwisko / Firma: ..................................

Stanowisko: ..................................

Podpis: ..................................

Data: ..................................

&nbsp;

**Za BlackSlon Protocol Foundation (Tokenizator):**

Imi\u0119 i nazwisko: ..................................

Stanowisko: ..................................

Podpis: ..................................

Data: ..................................

---

*ETPA v1.0 \u00b7 BlackSlon Protocol Foundation \u00b7 Dokument poufny*
