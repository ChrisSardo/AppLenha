//Não entendi a necessidade mas, precisa ter doGet

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .append("<link rel='stylesheet' href='styles.html' type='text/css'>");
}

//processInput basicamente é uma função para puxar e inserir os valores em uma tabela do Google Sheets, deveria estar separada em mais funções, mas tenho q otimizar muito o tempo 

function processInput(data) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("Home");
  
  if (!sheet) {
    throw new Error("A aba 'Home' não foi encontrada.");
  }

  // Obtém a próxima linha disponível na coluna A, usei da coluna A pois há formulas em outras colunas..
  const ultimaLinha = primeiraCelulaVazia();

  console.log("Entrou");
  
  const formatValue = (value) => (parseFloat(value) / 100).toFixed(2).replace('.', ',');

  const valores = [data.Valor1, data.Valor2, data.Valor3, data.Valor4, data.Valor5, data.Valor6];
  const soma = valores.reduce((total, valor) => total + (parseFloat(valor) || 0), 0);

  // Obtem apenas a hora atual formatada (HH:mm:ss)
  const horaAtual = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "HH:mm:ss");

  // Obtem o mês atual (formato MM)
  const mes = Utilities.formatDate(new Date(), "GMT", "MM");

  // Calcula a diferença entre a medida e o faturado
  const dif = data.ValorResult;
  const fat = data.ValorMF;
  const difflenha = dif - fat;

  // Valor da diferença
  const valm = data.ValorValor;
  const rsdif = difflenha * valm;

  //Atribuindo valores do HTML para variaveis 

  let val2 = String(data.ValorNF).trim(); //NF
  let val3 = new Date(); // Adiciona a data/hora atual
  let val4 = data.ValorForn; // Cod Fornecedor
  let val5 = data.ValorMF; 
  let val6 = data.ValorValor;
  let val7 = data.ValorMat = 'PIQU000001';
  let val8 = data.ValorNull1 = null;
  let val9 = data.ValorResult;
  let val10 = data.ValorNull2 = null;
  let val11 = data.ValorNull3 = null;
  let val12 = data.Valor1;
  let val13 = data.Valor2;
  let val14 = data.Valor3;
  let val15 = data.Valor4;
  let val16 = data.Valor5;
  let val17 = data.Valor6;
  let val18 = soma;
  let val19 = data.ValorComp;
  let val20 = data.ValorLarg;
  let val21 = data.ValorResult;
  let val22 = horaAtual;
  let val23 = data.ValorMedidor;
  let val24 = data.VAlorNull = null;
  let val25 = data.ValorPlaca;
  let val26 = difflenha;
  let val27 = rsdif;
  let val28 = mes;

  // Insere os valores nas células específicas da próxima linha
  sheet.getRange(ultimaLinha, 1).setValue(val2); // Coluna A
  sheet.getRange(ultimaLinha, 2).setValue(val3); // Coluna B
  sheet.getRange(ultimaLinha, 3).setValue(val4); // Coluna C
  sheet.getRange(ultimaLinha, 4).setValue(val5); // Coluna D
  sheet.getRange(ultimaLinha, 5).setValue(val6); // Coluna E
  sheet.getRange(ultimaLinha, 6).setValue(val7); // Coluna F
  sheet.getRange(ultimaLinha, 7).setValue(val8); // Coluna G
  sheet.getRange(ultimaLinha, 8).setValue(val9); // Coluna H
  sheet.getRange(ultimaLinha, 9).setValue(val10); // Coluna I
  sheet.getRange(ultimaLinha, 10).setValue(val11); // Coluna J
  sheet.getRange(ultimaLinha, 11).setValue(val12); // Coluna K
  sheet.getRange(ultimaLinha, 12).setValue(val13); // Coluna L
  sheet.getRange(ultimaLinha, 13).setValue(val14); // Coluna M
  sheet.getRange(ultimaLinha, 14).setValue(val15); // Coluna N
  sheet.getRange(ultimaLinha, 15).setValue(val16); // Coluna O
  sheet.getRange(ultimaLinha, 16).setValue(val17); // Coluna P
  sheet.getRange(ultimaLinha, 17).setValue(val18); // Coluna Q
  sheet.getRange(ultimaLinha, 18).setValue(val19); // Coluna R
  sheet.getRange(ultimaLinha, 19).setValue(val20); // Coluna S
  sheet.getRange(ultimaLinha, 20).setValue(val21); // Coluna T
  sheet.getRange(ultimaLinha, 21).setValue(val22); // Coluna U
  sheet.getRange(ultimaLinha, 22).setValue(val23); // Coluna V
  sheet.getRange(ultimaLinha, 23).setValue(val24); // Coluna W
  sheet.getRange(ultimaLinha, 24).setValue(val25); // Coluna X
  sheet.getRange(ultimaLinha, 25).setValue(val26); // Coluna Y
  sheet.getRange(ultimaLinha, 26).setValue(val27); // Coluna Z
  sheet.getRange(ultimaLinha, 27).setValue(val28); // Coluna AA
  
  

  console.log("Dados enviados com sucesso!");

  executeOnEdit(sheet);
  return "D!";
}

function primeiraCelulaVazia() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Obtem a planilha ativa
  var coluna = 1; // Define a coluna para verificar (1 = Coluna A)
  var ultimaLinha = sheet.getLastRow(); // Última linha com algum conteúdo
  
  for (var i = 1; i <= ultimaLinha + 1; i++) {
    if (!sheet.getRange(i, coluna).getValue()) {
      return i; // Retorna o número da linha da primeira célula vazia
    }
  }
}

function executeOnEdit2(sheet, novaLinha){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetR = spreadsheet.getSheetByName("Home");
  const lastRow = sheetR.getLastRow();
  const editedColumn = 1;
  const editedvalor = sheetR.getRange(editedColumn,lastRow)
  let i = 1;
  let scan = sheetR.getRange(i,editedColumn)
  while(scan.getValue() == ""){
    i = i +1;
    Logger.log(scan.getValue());
    scan = sheetR.getRange(i,editedColumn);
    continue;
  }
  scan = sheetR.getRange(i,editedColumn)
  if(scan.getValue()== editedvalor.getValue()){
    const setter = sheet.getRange('AA'+lastRow);
    setter.setValue("SIM")
  }else{
    const setter = sheetR.getRange('AA'+lastRow);
    setter.setValue("NÃO")
    Logger.log(sheetR.getLastRow());
  }

  
}

function formatarColunaATexto() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName("Home"); 

  if (!aba) {
    throw new Error("A aba 'Home' não foi encontrada.");
  }

  // Define o intervalo da coluna A (toda a coluna)
  const colunaA = aba.getRange("A:A");

  // Configura o formato da coluna para texto
  colunaA.setNumberFormat("@STRING@");

  //Verifica se há valores que precisam ser convertidos para texto
  const valores = colunaA.getValues();

  for (let i = 0; i < valores.length; i++) {
    if (valores[i][0] !== "") {
      // Converte o valor explicitamente para texto
      colunaA.getCell(i + 1, 1).setValue(String(valores[i][0]));
    }
  }

  Logger.log("Coluna A formatada como texto com sucesso!");
}

// function executeOnButton(sheet, novaLinha){
// const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
// const sheetV = spreadsheet.getSheetByName("Home");
// const sheetR = spreadsheet.getSheetByName("RECEB");
// let linha = sheetV.getLastRow()+1;

// for(i = linha;i>0;i--){
//   // Logger.log(i);
//   if(sheetV.getRange(linha,27)!="Sim"){
//     let linhaR = sheetR.getLastRow();
//     for(j=linhaR;j>0;j--){
//       // Logger.log(j);
//         Logger.log("V "+sheetV.getRange(i,1).getValue()+"//  R "+sheetR.getRange(j,1).getValue())
//       if(sheetV.getRange(i,1).getValue()==sheetR.getRange(j,1).getValue()){
//         const setyn = sheetV.getRange(i,27);
//         setyn.setValue("Sim");
//         // Logger.log('sim');
//       }else{
//         const setyn = sheetV.getRange(i,27);
//         setyn.setValue("Não");
//         // Logger.log('não');
//       }
//     }
//   }
// }
// }


function compararColunasProcurandoNaOutra() {
  formatarColunaATexto();
  // Abra a planilha ativa
  const planilha = SpreadsheetApp.getActiveSpreadsheet();

  // Acesse as abas
  const abaHome = planilha.getSheetByName("Home");
  const abaReceb = planilha.getSheetByName("RECEB");

  if (!abaHome || !abaReceb) {
    throw new Error("Verifique se as abas 'Home' e 'RECEB' existem.");
  }

  // Obtenha os valores da Coluna A das abas
  const valoresHome = abaHome.getRange(1, 1, abaHome.getLastRow()).getValues();
  const valoresReceb = abaReceb.getRange(1, 1, abaReceb.getLastRow()).getValues().flat();
  const valoresHomem3 = abaHome.getRange(1, 5, abaHome.getLastRow()).getValues();
  const valoresRecebm3 = abaReceb.getRange(1, 14, abaReceb.getLastRow()).getValues();

  // Itere por cada valor da aba Home
  for (let i = 0; i < valoresHome.length; i++) {
    const valorAtual = String(valoresHome[i][0]).trim(); // Converte o valor para string e remove espaços extras
    const valorHome = String(valoresHomem3[i][0]).trim();
    const valorReceb = String(valoresRecebm3[i][0]).trim();
    Logger.log(valorHome);
      Logger.log(valorReceb);
    let resultado = "Não";
    if(valoresReceb.map(String).map(v => v.trim()).includes(valorAtual) && valorHome == valorReceb){
      Logger.log(valorHome);
      Logger.log(valorReceb);
      resultado = "Sim";
    }else{
      resultado = "Não";
    }

    // // Verifica se o valor existe na aba RECEB (convertendo valores para strings)
    // const resultado = valoresReceb.map(String).map(v => v.trim()).includes(valorAtual) ? "Sim" : "Não";

    // // Insira o resultado na Coluna 27 (AA) da aba Home
    abaHome.getRange(i + 1, 27).setValue(resultado);
  }
}

function executeOnEdit(sheet) {
  const lastRow = primeiraCelulaVazia(); // Última linha (linha inserida)
  const editedColumn = 3; // Coluna do fornecedor
  const timestampColumn = 7; // Coluna de timestamp
  const timestampColumn2 = 23; // Coluna de timestamp

  // Lógica para verificar e adicionar o nome do fornecedor
  const forn = sheet.getRange(lastRow-1, editedColumn).getValue(); // Código do fornecedor
  const fornT = sheet.getRange(lastRow-1, timestampColumn); // Coluna de timestamp
  const fornT2 = sheet.getRange(lastRow-1, timestampColumn2); // Coluna de timestamp
  
  switch (forn) {
    case 128384:
      fornT.setValue("MICHALAK");
      fornT2.setValue("MICHALAK");
      break;
    case 200303:
      fornT.setValue("DUWE");
      fornT2.setValue("DUWE");
      break;
    case 127527:
      fornT.setValue("ARLINDO");
      fornT2.setValue("ARLINDO");
      break;
    case 128383:
      fornT.setValue("ARTHUR");
      fornT2.setValue("ARTHUR");
      break;
    default:
      fornT.setValue("Código desconhecido");
      fornT2.setValue("Código desconhecido");
      break;
  }
}



function includeCSS() {
  return `
    #calculoForm {
      font-family: Arial, sans-serif;
      margin: 20px;
      background-color: #000000;
    }
    h1 {
      color: white;
      text-align: center;
    }
    form {
      margin: 20px auto;
      max-width: 400px;
    }
    input[type="number"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .resultado {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      text-align: center;
      font-size: 1.5em;
    }
    button {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;
}
