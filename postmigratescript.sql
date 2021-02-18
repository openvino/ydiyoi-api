
-- POST MIGRATE SCRIPT

-- ########################################################################################################################

-- FOREIGN KEYS

-- experience
ALTER TABLE public.experience ADD CONSTRAINT fk_status FOREIGN KEY (statusid) REFERENCES status(id);
ALTER TABLE public.experience ADD CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES "user"(id);

--experienceproof
ALTER TABLE public.experienceproof ADD CONSTRAINT fk_experience FOREIGN KEY (experienceid) REFERENCES experience(id);

-- user
ALTER TABLE public."user" ADD CONSTRAINT fk_role FOREIGN KEY (roleid) REFERENCES role(id);
ALTER TABLE public."user" ADD CONSTRAINT fk_status FOREIGN KEY (statusid) REFERENCES status(id);

-- wine
ALTER TABLE public.wine ADD CONSTRAINT fk_experience FOREIGN KEY (experienceid) REFERENCES experience(id);

-- ########################################################################################################################

-- INSERT TEST DATA

-- experience
INSERT INTO public.experience (xpdate,xplocation,userid,statusid) VALUES
	 ('2021-02-17 23:05:43.827-03','Mendoza',1,2);

--experienceproof
INSERT INTO public.experienceproof (photo,"comment",surveylink,surveyquestions,surveyanswers,experienceid) VALUES
	 ('url/photoid','Primera experiencia','url/surveyid',NULL,NULL,1);

-- role
INSERT INTO public."role" ("name",description) VALUES
	 ('Admin','User administrator'),
	 ('Reviewer','user reviewer'),
	 ('WineLover','Common WineLover user');

-- status
INSERT INTO public.status ("name",description) VALUES
	 ('New','New User or Experience'),
	 ('Pending Validation','user or experience waiting to be validated by an administrator user'),
	 ('Active','Active User'),
	 ('Inactive','Inactive User');

-- user
INSERT INTO public."user" (firstname,lastname,username,birthdate,email,address_1,address_2,"password",walletaddress,roleid,statusid) VALUES
	 ('Luis','Videla','luisvid','1973-08-23 00:00:00-03','luisvid@gmail.com','A Maure 234, Mendoza, Argentina','','$2a$10$tksmS972xKet9Vt5PVItp.hABtpnXBxOxKgaUc23jhK57QOgM28xK','',1,2);

-- wine
INSERT INTO public.wine ("name",description,qrvalue,tokensymbol,tokenvalue,experienceid) VALUES
	 ('MTB Malbec 2018','MTB Malbec 2018','url/id_1','MTB',1,NULL),
	 ('MTB Malbec 2018','MTB Malbec 2018','url/id_2','MTB',1,NULL);

