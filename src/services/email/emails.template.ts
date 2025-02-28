export function getEmailTemplate(email: string, bottle: any) {
  return `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#eff2f7"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellspacing="0" cellpadding="0" align="center" class="es-header esd-header-popover">
                <tbody>
                  <tr>
                    <td align="center" bgcolor="#850d4a" class="esd-stripe" style="background-color:#850d4a">
                      <table width="600" cellspacing="0" cellpadding="0" bgcolor="#0c66ff" align="center" esd-img-prev-src class="es-header-body" style="background-color:#0c66ff">
                        <tbody>
                          <tr>
                            <td align="left" esd-img-prev-src bgcolor="#850d4a" class="esd-structure es-p20t es-p20b es-p15r es-p15l" style="background-color:#850d4a">
                              <table cellspacing="0" cellpadding="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="570" align="center" valign="top" class="es-m-p0r esd-container-frame">
                                      <table width="100%" role="presentation" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0">
                                              <a target="_blank">
                                                <img src="https://fkeeqdd.stripocdn.email/content/guids/02533001-51de-439b-90e6-b2de7ef8c1ae/images/websitelogodjw5ck4.png" alt="" width="300" class="img-1007">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table width="600" cellspacing="0" cellpadding="0" bgcolor="#fefefe" align="center" esd-img-prev-src class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" bgcolor="#F5F5DC" class="esd-structure es-p40t es-p40b es-p15r es-p15l" style="background-color:#F5F5DC">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="570" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p20t es-p20b">
                                              <h1 class="es-m-txt-c">
                                                <b>
                                                  You Drink It, You Own It</b>
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p5b">
                                              <h3 class="es-m-txt-c" style="color:#333333">
                                                ${email}
                                              </h3>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p5b">
                                              <p style="color:#333333">
                                                Thank you for sharing your wine drinking experience with us.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p5b">
                                              <p>
                                                <strong>Date:&nbsp;</strong>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5b es-p5t">
                                              <p class="es-m-txt-c">
                                                <strong>
                                                  Bottle Identification: ${bottle}</strong>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p5b">
                                              <p class="es-m-txt-c">
                                                <strong>Welcome to OpenVino</strong>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-button es-p20b es-p20t">
                                              <span class="es-button-border" style="background:#D5841B;margin-bottom:10px">
                                                <a href="https://OpenVino.org" target="_blank" class="es-button es-button-7210" style="background:#D5841B;mso-border-alt:10px solid #D5841B;padding:15px 30px">
                                                  OpenVino.org
                                                </a>
                                              </span>
                                              <span class="es-button-border" style="background:#850d4a">
                                                <a href="https://openvino.exchange/costaflores" target="_blank" class="es-button" style="background:#850d4a;mso-border-alt:10px solid #D5841B;padding:15px 30px">
                                                  More🍷
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" bgcolor="#840c4a" class="esd-stripe" style="background-color:#840c4a">
                      <table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-footer-body" style="background-color:#ffffff">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p40t es-p40b es-p15r es-p15l">
                              <table cellspacing="0" cellpadding="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="570" align="left" class="es-m-p20b esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-m-txt-c es-m-p20b" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email/">
                                                <img src="https://fkeeqdd.stripocdn.email/content/guids/CABINET_62374b7897728079530e850caeb0a75816a16c3dfa8134de786143bb563a4849/images/logopoweredbyopenvino2.png" alt="" width="200" class="img-5342" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-social es-p20t es-m-txt-c" style="font-size:0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p10r">
                                                      <a target="_blank" href="https://www.instagram.com/costafloresorganicvineyard/">
                                                        <img src="https://fkeeqdd.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Ig" title="Instagram" width="32" height="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p10r">
                                                      <a target="_blank" href="https://t.me/Open_Vino_EN/1">
                                                        <img src="https://fkeeqdd.stripocdn.email/content/assets/img/messenger-icons/logo-colored/telegram-logo-colored.png" alt="Telegram" title="Telegram" width="32" height="32">
                                                      </a>
                                                    </td>
                                                    <td valign="top" align="center">
                                                      <a target="_blank" href="https://costaflores.com/">
                                                        <img width="32" src="https://fkeeqdd.stripocdn.email/content/assets/img/other-icons/logo-colored/link-logo-colored.png" alt="Website" title="Website" height="32">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content esd-footer-popover">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="transparent" align="center" cellpadding="0" cellspacing="0" width="600" esd-img-prev-src class="es-content-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" esd-img-prev-src class="esd-structure es-p30t es-p30b es-p20r es-p20l">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td valign="top" width="560" align="center" class="esd-container-frame">
                                      <table width="100%" role="presentation" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-empty-container" style="display:none"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}
