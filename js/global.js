function addLoadEvent (func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}

function insertAfter(newEle, targetEle) {
	var parent = targetEle.parentNode;
	if (parent.lastChild == targetEle) {
		parent.appendChild(newEle);
	} else {
		parent.insertBefore(newEle, targetEle.nextSibling);
	}
}

function addClass(ele, value) {
	if (!ele.className) {
		ele.className = value;
	} else {
		newClassName = ele.className;
		newClassName += " ";
		newClassName += value;
		ele.className = newClassName;
	}
}


/*       使当前页面导航栏高亮           */
function highlightPage () {
	if (!document.getElementsByTagName) { return false; }
	if (!document.getElementById) { return false; }
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) { return false; }
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) { return false; }
	var links = navs[0].getElementsByTagName('a');
	var linkUrl;
	for (var i = 0; i < links.length; i++) {
		linkUrl = links[i].getAttribute('href');
		if (window.location.href.indexOf(linkUrl) != -1) {
			links[i].className = "here";
			var linkText = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id', linkText);
			// console.log(document.body.getAttribute('id'));
		}
	}
}
addLoadEvent(highlightPage);


/*          About.html的section显示方式               */
function showSection (id) {
	var sections = document.getElementsByTagName('section');
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute('id') != id) {
			sections[i].style.display = 'none';
		} else {
			sections[i].style.display = 'block';
		}
	}
}
function prepareInternalnav () {
	var articles = document.getElementsByTagName('article');
	if (articles.length == 0) { return false; }
	var navs = articles[0].getElementsByTagName('nav');
	if (navs.length == 0) { return false; }
	var nav = navs[0];
	var links = nav.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute('href').split('#')[1];
		if (!document.getElementById(sectionId)) { continue; }
		document.getElementById(sectionId).style.display = 'none';
		links[i].destination = sectionId;
		links[i].onclick = function () {
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);


/*       photos.html页的图片库           */
function showPic (whichpic) {
	 if (!document.getElementById('placeholder')) { return true; }
	 var source = whichpic.getAttribute('href');
	 var placeholder = document.getElementById('placeholder');
	 placeholder.setAttribute('src', source);
	 if (!document.getElementById('description')) { return false; }
	 if (whichpic.getAttribute('title')) {
	 	var text = whichpic.getAttribute('title');
	 } else {
	 	var text = '';
	 }
	 var description = document.getElementById('description');
	 if (description.firstChild.nodeType == 3) {
	 	description.firstChild.nodeValue = text;
	 }
	 return false;
}
function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
}
function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
    }
  }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);


/*           live.html页面的表格脚本               */
function stripleTables () {
	if (!document.getElementsByTagName) { return false; }
	var tables = document.getElementsByTagName('table');
	for (var i = 0; i < tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName('tr');
		for(var j = 0, length2 = rows.length; j < length2; j++){
			if (odd == true) {
				addClass(rows[j], 'odd');
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}
function highlightRows () {
	if (!document.getElementsByTagName) { return false; }
	var rows = document.getElementsByTagName('tr');
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function () {
			addClass(this, 'highlight');
		}
		rows[i].onmouseout = function () {
			this.className = this.oldClassName;
		}
	}
}
function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var container = document.getElementsByTagName("article");
  container[0].appendChild(header);
  container[0].appendChild(dlist);
}
addLoadEvent(stripleTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);


/*            contact.html页面点击label获得焦点              */
function focusLabels () {
	if (!document.getElementsByTagName) { return false; }
	var labels = document.getElementsByTagName('label');
	for (var i = 0; i < labels.length; i++) {
		if (!labels[i].getAttribute('id')) { continue; }
		labels[i].onclick = function () {
			var id = labels[i].getAttribute('id');
			if (!document.getElementById(id)) { return false; }
			var ele = document.getElementById(id);
			ele.focus();
		}
	}
}
function isFilled (field) {
	if (field.value.replace(' ','').length === 0) { return false; }
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return (field.value !==  placeholder);
}
function isEmail (field) {
	return ((field.value.indexOf('@') !== -1) && (field.value.indexOf('.') !== -1));
}
function validateForm (whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var ele = whichform.elements[i];
		if (ele.required === 'required') {
			if (!isFilled(ele)) {
				alert("Please fill in the " + ele.name + " field.");
				return false;
			}
		}
		if (ele.type === 'email') {
			if (!isEmail(ele)) {
				alert("The " + ele.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}
function prepareForms () {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		thisform.onsubmit = function () {
			if(!validateForm(thisform))  return false;
			var article = document.getElementsByTagName('article')[0];
			if (submitFormWithAjax(this, article)) { return false;}
			return true;
		}
	}
}
addLoadEvent(prepareForms);


/*       提交表单后使用AJAX加载提交成功提示信息        */
function getHTTPObject () {
	if (typeof XMLHttpRequest == "undefined") {
		XMLHttpRequest = function () {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch(e) {
				// statements
				console.log(e);
			}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch(e) {
				// statements
				console.log(e);
			}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				// statements
				console.log(e);
			}
			return false;
		}
	}
	return new XMLHttpRequest();
}
function displayAjaxLoading (ele) {
	while (ele.hasChildNodes()) {
		ele.removeChild(ele.lastChild);
	}
	var content = document.createElement('img');
	content.setAttribute('src', 'images/loading.gif');
	content.setAttribute('alt', 'Loading...');
	ele.appendChild(content);
}
/*   跨域访问本地文件需要给chrome添加 --allow-file-access-from-files权限   */
function submitFormWithAjax (whichform, thetarget) {
	var request = getHTTPObject();
	if (!request) { return false; }
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var ele;
	for (var i = 0; i < whichform.elements.length; i++) {
		ele = whichform.elements[i];
		dataParts[i] = ele.name + '=' + encodeURIComponent(ele.value);
	}
	// console.log(whichform.elements);
	var data = dataParts.join('&');
	// console.log(data);
	request.open('POST', whichform.getAttribute('action'), true);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	};
	request.send(data);
	return true;
}
