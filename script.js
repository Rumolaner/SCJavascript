function clearAll() {
  $('#sortalgo').val("");
  $('#searchalgo').val("");
  $('#searchvalue').val("");
  $('#valuelist').val("");
  $('#protocol').html("Kein Protokol");
}

function setStandard() {
  $('#valuelist').val("29,64,92,33,47,5,25,1,35,26,67,49,89,25,53,98,32,52,7,74,73,34,69,35,21,62,10,39,12,11,48,46,95,29,70,78,74,42,38,47,29,61,53,82,19,15,77,26,22,66,52,61,66,54,19,26,61,38,54,41,87,66,60,73,67,24,9,20,62,96,60,11,91,65,31,20,42,51,65,17,78,19,3,4,96,32,34,46,49,33,87,63,99,6,14,76,88,70,76,85");
}

function cleanProtocol(){
    $('#protocol').html("");
}

function writeProtocol(text){
  let temp = $('#protocol').html();
  if (temp != "")
    temp += "<br>";

  temp += text;
  $('#protocol').html(temp);
}

function valuesToArray(list){
  let aList = list.split(",");

  for (let i=0; i<aList.length; i++) {
    if (isNaN(aList[i])){
      aList[i] = 0;
    }
  }

  return aList;
}

function valuesToString(temp){
  let text = "";

  for (let i=0;i<aList.length; i++){
    if (text != ""){
      text += ",";
    }

    text += aList[i].toString();
  }

  return text;
}

function perform() {
  cleanProtocol();
  if ($('#valuelist').val() == "") {
    writeProtocol("Die Werteliste ist leer, es gibt nichts zu tun");
    return;
  } else {
    writeProtocol("Werte: " + $('#valuelist').val());
  }

  let sortAlgo = $('#sortalgo').val();
  let searchAlgo = $('#searchalgo').val();
  let searchvalue = $('#searchvalue').val();

  if (searchvalue == ""){
    searchvalue = 0;
  }

  if (sortAlgo == "" && searchAlgo == ""){
    writeProtocol("Es muss wenigstens ein Sortieralgorithmus oder ein Suchalgorithmus gew&auml;hlt werden");
    return;
  } else {
    writeProtocol("Sortieralgorithmus: " + $('#sortalgo option:selected').text());
    writeProtocol("Suchalgorithmus: " + $('#searchalgo option:selected').text());
    writeProtocol("Suchwert: " + searchvalue);
  }

  aList = valuesToArray($('#valuelist').val());

  if (sortAlgo != ""){
    writeProtocol("Starte Sortieren");
    if (sortAlgo == "sort1"){
      //Bubble Sort
      aList = SortBubble(aList);
    } else if(sortAlgo == "sort2"){
      //opt. Bubble Sort
      aList = SortOptBubble(aList);
    } else {
      writeProtocol("Unbekannter Sortieralgorithmus");
    }
    writeProtocol("Beende Sortieren");
    writeProtocol("Sortierergebnis: " + valuesToString(aList));
  }

  if (searchAlgo != ""){
    let result = -1;
    writeProtocol("Starte Suche");
    if (searchAlgo == "search1"){
      //Linear Search
      result = SearchLinear(aList, searchvalue);
    } else {
      writeProtocol("Unbekannter Suchalgorithmus");
    }
    writeProtocol("Beende Suche");
    if (result == -1){
      writeProtocol("Suchwert nicht gefunden");
    } else {
      writeProtocol("Suchwert gefunden an :" + result.toString());
    }
  }
}

function SortBubble(aList) {
  writeProtocol("Starte outer loop");
  for(i = aList.length -1; i > 1; i--){
    writeProtocol("Outer loop no: " + (aList.length - i).toString());
    writeProtocol("Starte inner loop");
    for (j = 0; j < i; j++) {
      if (aList[j] > aList[j + 1]) {
        writeProtocol("Tausche " + j + "/" + aList[j] + " mit " + (j+1) + "/" + aList[j+1]);
        temp = aList[j];
        aList[j] = aList[j + 1];
        aList[j + 1] = temp;
      }
    }
  }

  return aList;
}

function SortOptBubble(aList) {
  let swapped = false;
  writeProtocol("Starte outer loop");
  for(i = aList.length -1; i > 1; i--){
    writeProtocol("Outer loop no: " + (aList.length - i).toString());
    writeProtocol("Starte inner loop");
    swapped = false;
    for (j = 0; j < i; j++) {
      if (aList[j] > aList[j + 1]) {
        swapped = true;
        writeProtocol("Tausche " + j + "/" + aList[j] + " mit " + (j+1) + "/" + aList[j+1]);
        temp = aList[j];
        aList[j] = aList[j + 1];
        aList[j + 1] = temp;
      }
    }
    if (swapped == false){
      break;
    }
  }

  return aList;
}

function SearchLinear(aLists, value){
  let result = -1;
  writeProtocol("Starte loop");
  for(i = 0; i < aList.length; i++){
    if (aList[i] == value){
      writeProtocol("value found, stop loop");
      result = i;
      break;
    }
  }

  return result;
}
