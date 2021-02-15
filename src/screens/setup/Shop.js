import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import { Shop } from './styles';

import Button from '../../components/LanistaButton';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default ({
  toggleDrawer,

  id,
  email,
  firstName,
  lastName,
  language,
  companyName,
  phoneNumber,
  country,
  city,
  zipcode,
  street,

  tariffData,
  getTariff,
  getTariffLoading,
  getTariffError,
}) => {
  const {t} = useTranslate("shop");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNovalnetForm, setShowNovalnetForm] = useState(false);

  const [amount, setAmount] = useState(null);
  const [uniqid, setUniqid] = useState(null);
  const [hash, setHash] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [tariff, setTariff] = useState(null);
  const [testMode, setTestMode] = useState(null);
  const [tariffPeriod, setTariffPeriod] = useState(null);

  /*
  useEffect(() => {
    setSelectedProduct(null);
    setShowNovalnetForm(false);
  }, []);
  */

  useEffect(() => {
    if( selectedProduct ) {
      getTariff({
        variables: {
          tariff: selectedProduct
        }
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    if( selectedProduct && tariffData ) {
      const {amount, uniqid, hash, authCode, product, tariff, testMode, tariffPeriod} = tariffData;
      setAmount(amount);
      setUniqid(uniqid);
      setHash(hash);
      setAuthCode(authCode);
      setProduct(product);
      setTariff(tariff);
      setTestMode(testMode);
      setTariffPeriod(tariffPeriod);

      setShowNovalnetForm(true);
    }
  }, [tariffData]);

  useEffect(() => {
    if( amount !== null && uniqid !== null && hash !== null && authCode !== null && product !== null &&  tariff !== null &&  testMode !== null &&  tariffPeriod !== null ) {
      document.getElementById("novalnet-form").submit();
    }
  }, [amount, uniqid, hash, authCode, product, tariff, testMode, tariffPeriod]);

  const onClose = () => {
    setSelectedProduct(null);
    setShowNovalnetForm(false);
    toggleDrawer();
  };

  return (
    <Shop style={{height: showNovalnetForm ? "100vh" : "initial"}}>
      <IconButton size="large" onClick={onClose} className="close-button">
        <CloseIcon fontSize="large" />
      </IconButton>
      <div className="shop-header">{showNovalnetForm ? '' : 'Wähle ein Produkt aus. Alle Beträge zzgl. MwSt.' }</div>
      <div className="products" style={{display: showNovalnetForm ? "none" : "initial"}}>
        <form action="https://paygate.novalnet.de/paygate.jsp" method="post" target="test_iframe" id="novalnet-form">
          <input type="hidden" name="chosen_only" value="1" />
          <input type="hidden" name="address_form" value="1" />
          <input type="hidden" name="vendor" value="1419" />
          <input type="hidden" name="product" value={product} />
          <input type="hidden" name="sgpt_only" value="37,34,33" />
          <input type="hidden" name="tariff" id="tariff" value={tariff} />
          <input type="hidden" name="currency" value="EUR" />
          <input type="hidden" name="auth_code" value={authCode} />

          <input type="hidden" name="first_name" value={firstName} />
          <input type="hidden" name="last_name" value={lastName} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="street" value={street} />
          <input type="hidden" name="search_in_street" value="1" />
          <input type="hidden" name="house_no" value="" />
          <input type="hidden" name="search_in_street" value="0" />
          <input type="hidden" name="city" value={city} />
          <input type="hidden" name="company" value={companyName} />
          <input type="hidden" name="zip" value={zipcode} />
          <input type="hidden" name="lang" value="DE" />
          <input type="hidden" name="country_code" value="DE" />
          <input type="hidden" name="implementation" value="ENC" />
          <input type="hidden" name="tel" value={phoneNumber} />
          <input type="hidden" name="mobile" value={phoneNumber} />
          <input type="hidden" name="test_mode" value={testMode} />
          <input type="hidden" name="customer_no" value={id} />

          <input type="hidden" name="due_date" value="" />
          <input type="hidden" name="order_no" value="" />
          <input type="hidden" name="on_hold" value="0" />
          <input type="hidden" name="referrer_id" value="" />
          <input type="hidden" name="hfooter" value="1" />
          <input type="hidden" name="shide" value="0" />
          <input type="hidden" name="skip_cfm" value="1" />
          <input type="hidden" name="skip_suc" value="1" />
          <input type="hidden" name="thide" value="0" />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="uniqid" value={uniqid} />
          <input type="hidden" name="hash" value={hash} />

          <input type="hidden" name="inv_pdf" value="0" />
          <Button onClick={() => setSelectedProduct(8641)}>
            {t("week-licence")} 7,99 EUR
          </Button>
          <Button onClick={() => setSelectedProduct(8642)}>
            {t("month-licence")} 24,99 EUR
          </Button>
          <Button onClick={() => setSelectedProduct(8643)}>
            {t("year-licence")} 199,99 EUR
          </Button>
        </form>
      </div>
      <div className="shop-footer">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {t('NOVALNET_LEGAL_TITLE')}
          </AccordionSummary>
          <AccordionDetails>
            <div className="novalnet-text">
              <p>
                Der für die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten von der Novalnet AG integriert. Die Novalnet AG ist ein Full Payment Service Provider, der u.a. die Zahlungsabwicklung übernimmt.
              </p>
              <p>
                Wählt die betroffene Person während des Bestellvorgangs in dem Online-Shop eine Zahlungsart aus, werden automatisiert Daten der betroffenen Person an die Novalnet AG übermittelt. Mit der Auswahl einer Zahlungsoption willigt die betroffene Person in diese, zur Abwicklung der Zahlung, Übermittlung personenbezogener Daten ein.
              </p>
              <p>
                Bei den an Novalnet übermittelten personenbezogenen Daten handelt es sich in der Regel um Vorname, Nachname, Adresse, Geburtsdatum, Geschlecht, Email-Adresse, IP-Adresse, Telefonnummer, Mobiltelefonnummer sowie um andere Daten, die zur Abwicklung einer Zahlung notwendig sind. Zur Abwicklung des Kaufvertrages notwendig sind auch solche personenbezogenen Daten, die im Zusammenhang mit der jeweiligen Bestellung stehen. Insbesondere kann es zum wechselseitigen Austausch von Zahlungsinformationen, wie Bankverbindung, Kartennummer, Gültigkeitsdatum und CVC-Code, Daten zu Waren und Dienstleistungen, Preise kommen.
              </p>
              <p>
                Die Übermittlung der Daten bezweckt insbesondere die Identitätsüberprüfung, die Zahlungsadministration und die Betrugsprävention. Der für die Verarbeitung Verantwortliche wird der Novalnet AG personenbezogene Daten insbesondere dann übermitteln, wenn ein berechtigtes Interesse für die Übermittlung gegeben ist. Die zwischen der Novalnet AG und dem für die Verarbeitung Verantwortlichen ausgetauschten personenbezogenen Daten werden ggfs. von der Novalnet AG an Wirtschaftsauskunfteien übermittelt. Diese Übermittlung bezweckt die Identitäts- und Bonitätsprüfung.
              </p>
              <p>
                Die Novalnet AG gibt die personenbezogenen Daten auch an Leistungserbringer oder Subunternehmer weiter, soweit dies zur Erfüllung der vertraglichen Verpflichtungen erforderlich ist oder die Daten verarbeitet werden sollen.
              </p>
              <p>
                Die betroffene Person hat die Möglichkeit, die Einwilligung zum Umgang mit personenbezogenen Daten jederzeit gegenüber der Novalnet AG zu widerrufen. Ein Widerruf wirkt sich nicht auf personenbezogene Daten aus, die zwingend zur (vertragsgemäßen) Zahlungsabwicklung verarbeitet, genutzt oder übermittelt werden müssen.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
        {getTariffLoading && (
          <div className="loading">
            <CircularProgress size={80}/>
          </div>
        )}
      </div>
      <iframe name="test_iframe" style={{width: "100%", height: "100%", position: "absolute", left: "0px", paddingBottom: "55px", paddingRight: "10px", paddingLeft: "10px"}} frameBorder="0" ></iframe>
    </Shop>
  )
}
