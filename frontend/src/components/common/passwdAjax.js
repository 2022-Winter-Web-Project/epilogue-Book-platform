
// 비밀번호 안전 단계 진단을 위해 사용하는 함수들  ###########################################################################
var url_login = "/user2/checkPasswd?m=checkPasswdForLogin";
var url_nologin = "/user2/checkPasswd?m=checkPasswdForNoLogin";

var isshift=false;
var isCapslock = false;
var pswdlevel= 0;
var focuswhere= 0;
var pwdstat = true;


function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
function getAjaxResult(urls, params){
	try {
		var xmlhttp = getXmlHttp();
		xmlhttp.open("POST", urls);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			pwdstr = xmlhttp.responseText

      if(pwdstr < 20000)
        pwdstat = false;
      else
        pwdstat = true;
			sendLevel(pwdstr);
		}}
		xmlhttp.send(params);
	} catch(e) {
		sendLevel(20000);
		if (window.bridgeGotTime) {
			throw e;
		} else {
			//page reload?
		}
	}
}

function checkpwd_login(pwd_id, old_id){
	focuswhere=0;
	var newPassword = document.getElementById(pwd_id).value;
    if (newPassword.length <= 0) {
		showhelpmsg(-1);
	} else if (newPassword.length > 16) {
		sendLevel(10004);
	} else if (newPassword.length < 8) {
		sendLevel(5000);
	} else if (newPassword == document.getElementById(old_id).value ) {
   		sendLevel(10000);
	} else {
		getAjaxResult(url_login, "pw=" + escape(encodeURIComponent(newPassword)) );
	}
}

/*모바일 비밀번호 변경*/
function checkpwd_login_ajax_mobile(pwd_id, old_id, obj){
	focuswhere=0;
	var newPassword = document.getElementById(pwd_id).value;
    if (newPassword.length <= 0) {
		showhelpmsg(-1);
	} else if (newPassword.length > 16) {
		sendLevel(10004);
		document.getElementById(obj).innerHTML = "비밀번호는 최대 16자리까지 설정하실 수 있습니다.";
	} else if (newPassword.length < 8) {
		sendLevel(5000);
		document.getElementById(obj).innerHTML = "";
		document.getElementById("btn_" + pwd_id).style.display = "none";
	} else if (newPassword == document.getElementById(old_id).value ) {
   		sendLevel(10000);
   		document.getElementById(obj).innerHTML = "";
   		document.getElementById("btn_" + pwd_id).style.display = "none";
	} else {
		document.getElementById(obj).innerHTML = "";
		document.getElementById("btn_" + pwd_id).style.display = "none";
		getAjaxResult(url_login, "pw=" + escape(encodeURIComponent(newPassword)));
	}
}
/*모바일 비밀번호 변경*/


function checkpwd_nologin(pwd_id,id_id){
	focuswhere=0;
	var newPassword = document.getElementById(pwd_id).value;
    if (newPassword.length <= 0) {
		showhelpmsg(-1);
	} else if (newPassword.length > 16) {
		sendLevel(10004);
	} else if (newPassword.length < 8) {
		sendLevel(5000);
	} else {
		getAjaxResult(url_nologin, "pw=" + escape(encodeURIComponent(newPassword))+"&id="+document.getElementById(id_id).value+"&token_help="+document.getElementById("token_help").value);
	}
}

function checkpwd_nologin_ajax(pwd_id,id_id, obj, div_pwd_id){
	focuswhere=0;
	var newPassword = document.getElementById(pwd_id).value;
    if (newPassword.length <= 0) {
		showhelpmsg(-1);
	} else if (newPassword.length > 16) {
		sendLevel(10004);
		document.getElementById(obj).innerHTML = "비밀번호는 최대 16자리까지 설정하실 수 있습니다.";
	} else if (newPassword.length < 8) {
		sendLevel(5000);
	} else {
		document.getElementById(div_pwd_id).className = "input_row tool_z focus";
		getAjaxResult(url_nologin, "pw=" + escape(encodeURIComponent(newPassword))+"&id="+document.getElementById(id_id).value+"&token_help="+document.getElementById("token_help").value);
	}
}


function checkpwd_nologin_ajax_mobile(pwd_id,id_id, obj){
	focuswhere=0;
	var newPassword = document.getElementById(pwd_id).value;
    if (newPassword.length <= 0) {
		showhelpmsg(-1);
	} else if (newPassword.length > 16) {
		sendLevel(10004);
		document.getElementById(obj).innerHTML = "비밀번호는 최대 16자리까지 설정하실 수 있습니다.";
	} else if (newPassword.length < 8) {
		sendLevel(5000);
		document.getElementById(obj).innerHTML = "";
	} else {
		document.getElementById(obj).innerHTML = "";
		getAjaxResult(url_nologin, "pw=" + escape(encodeURIComponent(newPassword))+"&id="+document.getElementById(id_id).value+"&token_help="+document.getElementById("token_help").value);
	}
}

function sendLevel(pwdstr) {
	if (focuswhere == 0) {
	  if (pwdstr == 5000) {
		pswdlevel = 0;
  	  	showhelpmsg(6);
	  }else if (pwdstr <20000) {
		pswdlevel = 0;
  	  	showhelpmsg(1);
	  } else if (pwdstr>=20000 && pwdstr < 29998 ) {
		pswdlevel = 1;
  	  	showhelpmsg(2);
	  } else if (pwdstr == 29998) {
		pswdlevel = 1;
	  	showhelpmsg(7)
	  } else if (pwdstr == 29999) {
		pswdlevel = 1;
	  	showhelpmsg(5)
	  } else if (pwdstr>=30000 && pwdstr <40000) {
		pswdlevel = 1;
    	showhelpmsg(3);
	  } else if (pwdstr>=40000 && pwdstr <50000) {
		pswdlevel = 1;
	    showhelpmsg(4);
	  }
	} else {
		showhelpmsg(-1);
	}
}

function showhelpmsg(pwdlevel) {
	for (g = 1; g <= 7; g++) {
		if (pwdlevel==g) {
			if( !isCapslock ) {
				if(document.getElementById('help1_'+g)) {
					document.getElementById('help1_'+g).style.display="block";
				}
				if(document.getElementById('help2_'+g)) {
					document.getElementById('help2_'+g).style.display="none";
				}
			} else {
				if(document.getElementById('help1_'+g)) {
					document.getElementById('help1_'+g).style.display="none";
				}
				if(document.getElementById('help2_'+g)) {
					document.getElementById('help2_'+g).style.display="block";
				}
			}
		} else {
			if(document.getElementById('help1_'+g)) {
				document.getElementById('help1_'+g).style.display="none";
			}
			if(document.getElementById('help2_'+g)) {
				document.getElementById('help2_'+g).style.display="none";
			}
		}
	}
	if (pwdlevel==-1){
		focuswhere=1;
	}
}

function capslock(e) {
	var myKeyCode=0;
	var myShiftKey=false;
	if ( window.event ) { // IE
		myKeyCode=e.keyCode; myShiftKey=e.shiftKey;
	} else if (e.which) { // netscape ff opera
		myKeyCode=e.which;
		myShiftKey = isshift;
	}
	
	if ( ( myKeyCode >= 65 && myKeyCode <= 90 ) && !myShiftKey ) {
		isCapslock = true;
	} else if ( ( myKeyCode >= 97 && myKeyCode <= 122 ) && myShiftKey ) {
		isCapslock = true;
	} else {
		isCapslock = false;
	}
}

function showCapslock()
{
	if( isCapslock ) {
		document.getElementById('help2_1').style.display="block";
	} else {
		document.getElementById('help2_1').style.display="none";
	}
}

function checkShiftUp(e) {
	if (e.which && e.which==16){
		isshift = false;
	}
}
function checkShiftDown(e) {

	var myKeyCode = e.which || e.keyCode;
	if (myKeyCode && myKeyCode==16){
		isshift = true;
	}

	var element = document.getElementById('help2_1');

	if (myKeyCode && myKeyCode==20){
		if(!isCapslock) {
			isCapslock = true;
			element.style.display="block";
			setTimeout("hide('help2_1')",1500);
		} else {
			isCapslock = false;
			element.style.display="none";
		}
	}
	focuswhere=0;
}

function checkShiftDownNoMsg(e) {
	if (e.which && e.which==16){
		isshift = true;
	}
	focuswhere=0;
}

function show(id) {
	var e = document.getElementById(id);
	if (e != null) {
		e.style.display = "block";
	}
}
function hide(id) {
	var e = document.getElementById(id);
	if (e != null) {
		e.style.display = "none";
	}
}
// ###########################################################################
