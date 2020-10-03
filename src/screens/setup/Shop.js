import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import { Shop } from './styles';

import Button from '../../components/LanistaButton';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      <div className="shop-header">{showNovalnetForm ? '' : 'Select a product'}</div>
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
            {t("week-licence")} 9,27 EUR
          </Button>
          <Button onClick={() => setSelectedProduct(8642)}>
            {t("month-licence")} 28,99 EUR
          </Button>
          <Button onClick={() => setSelectedProduct(8643)}>
            {t("year-licence")} 231,99 EUR
          </Button>
        </form>
      </div>
      <div className="shop-footer">

      </div>

      {getTariffLoading && (
        <div className="loading">
          <CircularProgress size={80}/>
        </div>
      )}

      <iframe name="test_iframe" style={{width: "100%", height: "100%", position: "absolute", left: "0px", paddingBottom: "55px", paddingRight: "10px", paddingLeft: "10px"}} frameBorder="0" ></iframe>
    </Shop>
  )
}
