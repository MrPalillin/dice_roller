import { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Card, Form, InputGroup, CardGroup, Image, Modal } from 'react-bootstrap';
import './App.css';
import './bootstrap.min.css'
import d2 from './assets/d2.png'
import d3 from './assets/d3.png'
import d4 from './assets/d4.png'
import d6 from './assets/d6.png'
import d8 from './assets/d8.png'
import d10 from './assets/d10.png'
import d12 from './assets/d12.png'
import d20 from './assets/d20.png'
import d100 from './assets/d100.png'

function App() {

  const [dices, setDices] = useState("");
  const [rolls, setRolls] = useState([]);
  const [formulaValidation, setFormulaValidation] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <AppTitle></AppTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <DiceForm dices={dices} setDices={setDices} formulaValidation={formulaValidation} setFormulaValidation={setFormulaValidation} rolls={rolls} setRolls={setRolls}></DiceForm>
        </Col>
      </Row>
      <Row>
        <Col>
          <DiceSelector dices={dices} setDices={setDices}></DiceSelector>
        </Col>
      </Row>
      <Row>
        <Col>
          <DiceDisplayResult rolls={rolls}></DiceDisplayResult>
        </Col>
      </Row>
      <Row className="align-items-center" style={{marginTop:'1em'}}>
        <Col sm={8}>
          <DiceResolve rolls={rolls}></DiceResolve>
        </Col>
        <Col>
          <DiceSum rolls={rolls}></DiceSum>
        </Col>
      </Row>
    </Container>
  );

}

function AppTitle() {
  return <div className="elementBox"><h1 className="title">Dice Roller online</h1></div>;
}

function DiceForm({ dices, setDices, formulaValidation, setFormulaValidation, rolls, setRolls }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDiceChange(e) {
    setDices(e.target.value);
  }

  function calculateRoll(e) {

    e.preventDefault();

    if (dices === "") {
      setFormulaValidation(true);
      handleShow();
      return;
    }

    const regex_formula = /(\d+)d(\d+)|[+-]|(\d)/ig;
    const not_start_and_end_symbol = /^[-+]|[+-]$/g
    const not_multiple_signs = /[-+]{2,}/g
    const corrected_formula = dices.match(regex_formula).join("");

    setFormulaValidation(dices !== corrected_formula);

    if (dices !== corrected_formula || not_start_and_end_symbol.test(dices) || not_multiple_signs.test(dices)) {
      setFormulaValidation(true);
      handleShow();
      return;
    }

    setFormulaValidation(false);

    const calculate_formula = dices.replace(/\s/g, "").toLowerCase().match(regex_formula);

    let roll_array = [];


    calculate_formula.map((element) => {



      const dice = element.split("d");

      if (element.match(/[d]/)) {

        for (let i = 0; i < dice[0]; i++) {

          let rolled_formula = {};

          switch (dice[1]) {

            case "2":
              rolled_formula.image = d2;
              break;
            case "3":
              rolled_formula.image = d3;
              break;
            case "4":
              rolled_formula.image = d4;
              break;
            case "6":
              rolled_formula.image = d6;
              break;
            case "8":
              rolled_formula.image = d8;
              break;
            case "10":
              rolled_formula.image = d10;
              break;
            case "12":
              rolled_formula.image = d12;
              break;
            case "20":
              rolled_formula.image = d20;
              break;
            default:
              rolled_formula.image = d100;
              break;

          }

          rolled_formula.value = Math.floor(Math.random() * dice[1]) + 1

          roll_array.push(rolled_formula);

          if(i+1 < dice[0]){

            roll_array.push({'image': '', 'value': '+'});

          }

        }

      } else {

        let rolled_formula = {};

        rolled_formula.image = "";
        rolled_formula.value = dice[0];

        roll_array.push(rolled_formula);

      }



      return roll_array;

    });

    setRolls(roll_array);

  }

  return (
    <div>
      <Form onSubmit={calculateRoll} noValidate>
        <Row>
          <Col sm={10}>
            <div className="elementBox">
              <Form.Control required placeholder="Enter your input here, or use the dice value below" value={dices} onChange={handleDiceChange} style={{ width: '100%' }}>
              </Form.Control>
            </div>
          </Col>
          <Col sm={2}>
            <div className="elementBox">
              <Button type="submit" style={{ width: '100%' }}>Roll!</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Formula has errors</Modal.Title>
                </Modal.Header>
                <Modal.Body>The formula for the roll is incorrect. Please check for errors.</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Form>

    </div>
  );

}

function DiceSelector({ dices, setDices }) {
  return (
    <div className="elementBox">
      <Row>
        <Col>
          <DiceTemplate dice={d2} text="Add D2" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d3} text="Add D3" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d4} text="Add D4" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d6} text="Add D6" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d8} text="Add D8" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d10} text="Add D10" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d12} text="Add D12" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d20} text="Add D20" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
        <Col>
          <DiceTemplate dice={d100} text="Add D100" dices={dices} setDices={setDices}></DiceTemplate>
        </Col>
      </Row>
    </div>
  );
}

function DiceTemplate({ dice, text, dices, setDices }) {

  function addDieToFormula(die) {

    if (dices === "")
      setDices("1" + die.toLowerCase());
    else
      setDices(dices + "+1" + die.toLowerCase());

  }

  return (
    <div className="diceTemplate" onClick={() => addDieToFormula(text.split(" ")[1])}>
      <img src={dice} rounded alt={dice}></img>
      <div className="centered">{text}</div>
    </div>
  );
}

function DiceDisplayResult({ rolls }) {

  const result_list = rolls.map((element) => {
    if (element.image)
      return <DiceResult image={element.image} value={element.value}></DiceResult>
  })

  return (
    <Row className="justify-content-md-center">{result_list}</Row>
  );
}

function DiceResult({ image, value }) {

  return (
    <Col sm={1} style={{ 'textAlign': 'center' }} className='article'>
      <Image src={image} className='image'></Image>
      <label className='header'>{value}</label>
    </Col>
  );
}

function DiceResolve({ rolls }) {

  let res = "";

  for (let i = 0; i < rolls.length; i++) {

    if (rolls[i].image) {
      res += "[" + rolls[i].value + "]";
      if (i+1 < rolls.length)
        if (rolls[i + 1].image)
          res += "+";
    } else {
      res += rolls[i].value;
    }

  }

  return <h3 style={{textAlign:'center'}}>{res}</h3>
}

function DiceSum({ rolls }) {

  let res = "";

  for (let i = 0; i < rolls.length; i++) {

    res += rolls[i].value

  }

  res = eval(res);

  return <h1 style={{textAlign:'center'}}>Sum: {res}</h1>
}

export default App;

//Hacer añadido de dados por template mas dinámico:
//  -Si coincide el tipo de dado con el último de la fórmula, suma un dado a esa última parte (2d6 => 3d6)
//  -En caso contrario, añadir un nuevo dado a la fórmula, con un símobolo de suma por delante si ya hay elementos en el input, o sin símbolo de suma si el input está vacio
//Hacer que al añadir un dado mediante el template, muestre un modal pidiendo el número de dados a meter, y con ese resultado meterlos en el input tal y como se describe arriba