--PROIZVODJAC

INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'FRIKOM',  'Zrenjaninski put 65, Beograd','+3812133344');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Marbo produkt', 'Bratstva Jedinstva 56, Maglic' ,'+38121777111');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Jaffa D.O.O', 'Bulevar kneza Aleksandra Karadjordjevica 78, Beograd' ,'+38121222111');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Bambi', 'Pozarevac' ,'+38121554235');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'AD Imlek','Industrijska zona BB, Beograd','+38121789512');


INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (-100, 'TestNaz','TestAdr','TestKon');

--PROIZVOD

INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'), 'Jaffa biskvit',3);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'), 'Munchmallow',3);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'), 'Chipsy',2);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'), 'Plazma',4);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'), 'Strauss sladoled',1);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'), 'Jogurt',5);

INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (-100, 'NazivTest',2);

--RACUN

INSERT INTO "racun"("id","datum","nacin_placanja")
values (nextval('racun_seq'),to_date('01.01.2021.', 'dd.mm.yyyy.') , 'kes');
INSERT INTO "racun"("id","datum","nacin_placanja")
values (nextval('racun_seq'), to_date('11.01.2021.', 'dd.mm.yyyy.'), 'kartica');
INSERT INTO "racun"("id","datum","nacin_placanja")
values (nextval('racun_seq'), to_date('07.02.2021.', 'dd.mm.yyyy.'), 'kartica');
INSERT INTO "racun"("id","datum","nacin_placanja")
values (nextval('racun_seq'), to_date('15.03.2021.', 'dd.mm.yyyy.'), 'kes');
INSERT INTO "racun"("id","datum","nacin_placanja")
values (nextval('racun_seq'), to_date('28.01.2021.', 'dd.mm.yyyy.'), 'kartica');

INSERT INTO "racun"("id","datum","nacin_placanja")
values (-100, to_date('25.02.2021.', 'dd.mm.yyyy.'), 'Test_NP');

--STAVKA_RACUNA

INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (nextval('stavka_racuna_seq'),1,10,'komad',120, 1,1);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (nextval('stavka_racuna_seq'),2,5,'komad',150, 1,6);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (nextval('stavka_racuna_seq'),1,200,'komad',350, 2,5);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (nextval('stavka_racuna_seq'),1,50,'komad',80, 3,2);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (nextval('stavka_racuna_seq'),1,25,'komad',90, 4,3);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (nextval('stavka_racuna_seq'),1,30,'komad',200, 5,4);

INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES (-100,15,30,'komad',200, 2,3);
