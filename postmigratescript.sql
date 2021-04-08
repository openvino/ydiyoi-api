
-- POST MIGRATE SCRIPT 08/04/2021

-- ########################################################################################################################

-- FOREIGN KEYS

-- experience
ALTER TABLE public.experience ADD CONSTRAINT fk_status FOREIGN KEY (statusid) REFERENCES status(id);
ALTER TABLE public.experience ADD CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES "user"(id);

--experiencesurvey
ALTER TABLE public.experiencesurvey ADD CONSTRAINT fk_experience FOREIGN KEY (experienceid) REFERENCES experience(id);

-- user
ALTER TABLE public."user" ADD CONSTRAINT fk_role FOREIGN KEY (roleid) REFERENCES role(id);
ALTER TABLE public."user" ADD CONSTRAINT fk_status FOREIGN KEY (statusid) REFERENCES status(id);

-- wine
ALTER TABLE public.wine ADD CONSTRAINT fk_experience FOREIGN KEY (experienceid) REFERENCES experience(id);

-- ########################################################################################################################

-- INSERT TEST DATA

-- role
INSERT INTO public."role" ("name",description) VALUES
	 ('Admin','User administrator'),
	 ('Reviewer','user reviewer'),
	 ('WineLover','Common WineLover user');

-- status
INSERT INTO public.status ("name",description) VALUES
	 ('New','New User or Experience'),
	 ('Pending Validation','user or experience waiting to be validated by admin'),
	 ('Active','Active User'),
	 ('Inactive','Inactive User'),
	 ('Valid', 'Experience validated by admin'),
	 ('Rejected', 'Experience rejected by admin');

-- experience (relation: user HasMany experience)
INSERT INTO public.experience ("date",location,photofilename,statusid,userid) VALUES
	 ('2021-02-17 00:00:00-03','Mendoza','photofilename1.png',2,2),
	 ('2021-02-22 00:00:00-03','Mendoza','photofilename2.png',5,2);

--experiencesurvey (relation: experience HasOne survey)
INSERT INTO public.experiencesurvey (question1,answer1,question2,answer2,question3,answer3,experienceid) VALUES
	 ('Pregunta 1','Respuesta 1','Pregunta 2','Respuesta 2','Pregunta 3','Respuesta 3',4),
	 ('Pregunta 1','Respuesta 1','Pregunta 2','Respuesta 2','Pregunta 3','Respuesta 3',5);

-- user (relation: user HasMany experience)
INSERT INTO public."user" (firstname,lastname,telegramid,birthdate,email,address_1,address_2,"password",walletaddress,roleid,statusid) VALUES
	 ('Luis','Videla','@luisvid','1973-08-23 00:00:00-03','luisvid@gmail.com','A Maure 234, Mendoza, Argentina','','$2a$10$tksmS972xKet9Vt5PVItp.hABtpnXBxOxKgaUc23jhK57QOgM28xK','',1,2);

-- wine (relation: experience HasOne wine)
INSERT INTO public.wine ("name",description,qrvalue,tokensymbol,tokenvalue,experienceid) VALUES
	 ('MTB Malbec 2018','  MTB Malbec 2018',  'url/id_1','MTB',1,NULL),
	 ('MTB Malbec 2018',  'MTB Malbec 2018',  'url/id_2','MTB',1,NULL),
	 ('MTB Cabernet 2018','MTB Cabernet 2018','url/id_3','MTB',1,NULL),
	 ('MTB Bonarda 2018', 'MTB Bonarda 2018', 'url/id_4','MTB',1,NULL),
	 ('MTB Cabernet 2018','MTB Cabernet 2018','url/id_5','MTB',1,NULL),
	 ('MTB Bonarda 2018', 'MTB Bonarda 2018', 'url/id_6','MTB',1,NULL),
