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
    } else {
      aList[i] = Number(aList[i]);
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
    } else if (sortAlgo == "sort3") {
      //Selection Sort
      aList = SortSelect(aList);
    } else if (sortAlgo == "sort4") {
      //Merge Sort
      aList = SortMerge(aList);
    } else if (sortAlgo == "sort5") {
      //Insertion Sort
      aList = SortInsert(aList);
    } else if (sortAlgo == "sort6") {
      //Heap Sort
      aList = SortHeap(aList);
    } else if (sortAlgo == "sort7") {
      //Quick Sort
      aList = SortQuick(aList);
    } else if (sortAlgo == "sort8") {
      //Binary Tree Sort
      aList = SortTree(aList);
    } else {
      writeProtocol("Unbekannter Sortieralgorithmus");
      sortAlgo = "";
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
    } else if (searchAlgo == "search2") {
      //Binary Search
      if (sortAlgo == "") {
        writeProtocol("Binary Search ben&ouml;tigt eine sortiere Werteliste. Bitte einen Sortieralgorithmus w&auml;hlen");
      } else {
        result = SearchBinary(aList, searchvalue);
      }
    } else if (searchAlgo == "search3") {
      //Interpolation Search
      if (sortAlgo == "") {
        writeProtocol("Interpolation Search ben&ouml;tigt eine sortiere Werteliste. Bitte einen Sortieralgorithmus w&auml;hlen");
      } else {
        result = SearchInterpolation(aList, searchvalue);
      }
    } else {
      writeProtocol("Unbekannter Suchalgorithmus");
    }
    writeProtocol("Beende Suche");
    if (result == -1){
      writeProtocol("Suchwert nicht gefunden");
    } else {
      writeProtocol("Suchwert gefunden bei Index :" + result.toString());
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

function SortSelect(aList) {
  writeProtocol("Starte outer loop");
  for (i = 0; i < aList.length - 1; i++) {
    let biggest = i;
    writeProtocol("Outer loop no: " + i.toString());
    writeProtocol("Starte inner loop");
    for (j = i + 1; j < aList.length; j++) {
      if (aList[biggest] < aList[j]) {
        writeProtocol("New biggest number");
        biggest = j
      }
    }

    if (aList[biggest] > aList[i]) {
      let temp = aList[i];
      aList[i] = aList[biggest];
      aList[biggest] = temp;
    }
  }

  return aList;
}

function SortMerge(aList) {
  let ret = Array();
  if (aList.length < 2) {
    return aList;
  }

  let left = aList.slice(0, Math.floor(aList.length / 2));
  let right = aList.slice(Math.floor(aList.length / 2), aList.length);
  left = SortMerge(left);
  right = SortMerge(right);

  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      ret.push(left[0]);
      left.shift();
    } else {
      ret.push(right[0]);
      right.shift();
    }
  }

  while (left.length > 0) {
    ret.push(left[0]);
    left.shift();
  }

  while (right.length > 0) {
    ret.push(right[0]);
    right.shift();
  }

  return ret;
}

function SortInsert(aList) {
  writeProtocol("Starte outer loop");
  for(i = 0; i < aList.length-1; i++) {
    writeProtocol("Outer loop: " + (i + 1).toString());
    writeProtocol("Starte inner loop");
    for(j = i + 1; j >= 0;  j--) {
      writeProtocol("Inner loop: " + (i+1-j).toString());
      if (aList[j] > aList[j-1]) {
        writeProtocol("Tausche " + (j).toString() + " mit " + (j-1).toString() );

        let temp = aList[j];
        aList[j] = aList[j-1];
        aList[j-1] = temp;
      }
    }
  }

  return aList;
}

function Heapify(aList, start, stop){
  let parent = Math.floor((stop-1) / 2);
  writeProtocol("start Heapify");
  writeProtocol("Start: " + start.toString());
  writeProtocol("Stop: " + stop.toString());
  writeProtocol("Parent: " + parent.toString());

  for (let i = parent; i >= start; i-- ) {
    writeProtocol("start Heapify f&uuml;r parent: " + i.toString());
    let lChild = i * 2 + 1;
    let rChild = i * 2 + 2;
    writeProtocol("lChild: " + lChild.toString());
    writeProtocol("rChild: " + rChild.toString());

    if (rChild <= stop && aList[rChild] > aList[lChild]) {
      writeProtocol("Setze rChild als biggest");
      biggest = rChild
    } else {
      writeProtocol("Setze lChild als biggest");
      biggest = lChild;
    }
    writeProtocol("biggest: " + biggest + "/" + aList[biggest]);

    if (aList[biggest] > aList[i]) {
      writeProtocol("tausche parent und biggest Child");

      let temp = aList[i];
      aList[i] = aList[biggest];
      aList[biggest] = temp;
      aList = Heapify(aList, biggest, stop);
    }
  }

  return aList;
}

function SortHeap(aList) {
  writeProtocol("Initial Heapify");
  aList = Heapify(aList, 0, aList.length-1);

  for (let i = aList.length-1; i > 0; i--) {
    writeProtocol("Setze H&ouml;chsten Wert an Stelle " + (i+1).toString() + ": " + aList[0]);
    let temp = aList[i];
    aList[i] = aList[0];
    aList[0] = temp;
    Heapify(aList, 0, i-1);
  }

  return aList;
}

function QSTeile(aList, start, end) {
  let pivot = aList[end];
  writeProtocol("Function QSTeiler start:" + start.toString());
  writeProtocol("end: " + end.toString());
  writeProtocol("Pivot: " + pivot.toString());

  let i = start;
  let j = end - 1;

  while (i < j) {
    while (i < j && aList[i] <= pivot) {
      i ++;
    }

    while (i < j && aList[j] >= pivot) {
      j--;
    }

    writeProtocol("i: " + i.toString() + "/" + aList[i]);
    writeProtocol("j: " + j.toString() + "/" + aList[j]);

    if (aList[i] > aList[j]) {
      writeProtocol("change i and j");

      let temp = aList[i];
      aList[i] = aList[j];
      aList[j] = temp;
    }
  }

  if (aList[i] > pivot) {
    writeProtocol("value of i bigger than pivot i --> pivot: " + i.toString() + "/" + aList[i] + " --> " + pivot.toString() );
    let temp = aList[i];
    aList[i] = aList[end];
    aList[end] = temp;
  } else {
    writeProtocol("value of i smaller than pivot i --> pivot: " + i.toString() + "/" + aList[i] + " --> " + pivot.toString() );
    i = end;
  }

  return i;
}

function SortQuick(aList, start = 0, end = -1) {
  if (end == -1){
    end = aList.length - 1;
  }

  if (start < end){
    writeProtocol("New interval");
    writeProtocol("Start: " + start.toString());
    writeProtocol("End: " + end.toString());
    let  teiler = QSTeile(aList, start, end);
    writeProtocol("Teiler: " + teiler.toString());

    aList = SortQuick(aList, start, teiler - 1);
    aList = SortQuick(aList, teiler, end);
  }

  return aList;
}

class STNode {
  constructor(value){
    this.value = value;
    this.smaller = null;
    this.bigger = null;
  }

  insert(value) {
    if (value <= this.value){
      writeProtocol("new value is smaller");
      if (this.smaller == null){
        writeProtocol("Create new node");
        this.smaller = new STNode(value);
      } else {
        writeProtocol("pass value to existing value");
        this.smaller.insert(value);
      }
    } else {
      writeProtocol("new value is bigger");
      if (this.bigger == null){
        writeProtocol("Create new node");
        this.bigger = new STNode(value);
      } else {
        writeProtocol("pass value to existing node");
        this.bigger.insert(value);
      }
    }
  }

  traverse() {
    let retList = Array();

    if (this.smaller != null) {
      writeProtocol("Adding smaller values");
      retList = this.smaller.traverse();
    }

    writeProtocol("Adding local value:" + this.value.toString());
    retList.push(this.value);

    if (this.bigger != null) {
      writeProtocol("Adding bigger values");
      retList.push.apply(retList, this.bigger.traverse());
    }

    return retList;
  }
}

function SortTree(aList) {
  writeProtocol("Create tree root with value " + aList[0].toString());
  let node = new STNode(aList[0]);

  for (i = 1; i < aList.length; i++) {
    writeProtocol("Add new value " + aList[i].toString());
    node.insert(aList[i]);
  }

  writeProtocol("Start to traverse");
  let aList1 = node.traverse();
  return aList1;
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

function SearchBinary(aList, value){
  let result = -1;
  let min = 0;
  let max = aList.length - 1;
  let counter = 1;
  while (result == -1 && min <= max){
    writeProtocol("Loop no: " + counter.toString());
    let mid = Math.floor(min + ((max - min) / 2));
    writeProtocol("Mid: " + mid + "/" + aList[mid]);
    if (aList[mid] == value){
      result = mid;
    }
    if (aList[mid] < value){
      writeProtocol("Min = mid");
      min = mid;
    } else {
      writeProtocol("Max = mid");
      max = mid;
    }
    counter ++;

  }

  return result;
}

function SearchInterpolation(aList, value) {
  return -1;
}
