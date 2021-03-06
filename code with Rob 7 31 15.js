//Begin Sandbox/public/adl/sandbox/views/login.html

//<script type="text/javascript">
	var EncryptPassword = function (password, username,salt)
	{

		var unencrpytedpassword = password + username + salt;
		for (var i = 0; i < 1000; i++)
		{
			unencrpytedpassword = CryptoJS.SHA256(unencrpytedpassword) + '';
		}

		return unencrpytedpassword;
		
	}

	$(document).ready(function()
	{

		ko.applyBindings(vwfPortalModel);
	});

	function redirect()
	{
		window.location = vwfPortalModel.returnVal;
	}

	vwfPortalModel.handleLoginButton = function(o, e){

		var username = $('#txtusername').val();
		var password = $('#txtpassword').val();

		var salt = $.ajax( root + '/vwfDataManager.svc/salt?UID='+ username,{async:false}).responseText;

		password = EncryptPassword(password,username,$.trim(salt));

		var formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../../auth/local");
		xhr.addEventListener("load",function(xhr)
		{
			if(xhr.target.status === 301 || xhr.target.status === 302 || xhr.target.status === 200)
			{
				$('#txtusername').val('');
				$('#txtpassword').val('');
				redirect();
			}else
			{
				//$('#txtusername').val('');
				$('#txtpassword').val('');
				$('#txtpassword').focus();
				vwfPortalModel.errorText("Error: Please ensure your username and password are both correct");
			}

		});
		xhr.addEventListener("error",function()
		{
			//$('#txtusername').val('');
			$('#txtpassword').val('');
			$('#txtpassword').focus();

			vwfPortalModel.errorText("Error: Please ensure your username and password are both correct");
		},false);
		xhr.send(formData);
	};
/*</script>
<div id="content" class="row" style="margin:10px auto;float:none;text-align:center;">
	<div class="col-md-5" style="margin:10px auto;float:none;text-align:center;">
		<form data-bind="submit:handleLoginButton" >
			<fieldset>
				<legend style="padding-bottom:5px;">{{#translate}}Log in{{/translate}}</legend>
                {{#facebookLogin}}<a href="/adl/sandbox/auth/facebook" class="btn btn-primary" style="background: url(./img/signin.png);  background-position: -17px -100px;  width: 150px;  height: 50px;  border: none;  background-color: transparent;  border-radius: 9px;"><span class="fa fa-facebook"></span></a>{{/facebookLogin}}
                {{#twitterLogin}}<span class="fa fa-facebook"></span></a>
                <a href="/adl/sandbox/auth/twitter" class="btn btn-primary" style="background: url(./img/signin.png);
    background-position: -190px -100px;  width: 150px;  height: 50px;  border: none;  background-color: transparent;  border-radius: 9px;
"><span class="fa fa-facebook"></span></a></span></a>
                {{/twitterLogin}}
                {{#googleLogin}}<a href="/adl/sandbox/auth/google" class="btn btn-primary" style="
    background: url(./img/signin.png);
    background-position: -17px -40px;  width: 150px;  height: 50px;  border: none;  background-color: transparent;  border-radius: 9px;
"><span class="fa fa-facebook"></span></a>
                {{/googleLogin}}
                <br/><br/>
				<div class="col-md-10" style="margin:0 auto;float:none;">
					<input type='text' id='txtusername' placeholder='{{#translate}}Username{{/translate}}' class="form-control" /><br/>
					<input type='password' id='txtpassword' placeholder='{{#translate}}Password{{/translate}}' class="form-control"/><br/>
					<input type="submit" class='btn btn-default' style="float:right;"  value="{{#translate}}Submit{{/translate}}"/><br/>

					<p class="help-block" style="width:100%;margin-top:20px;" data-bind="visible:errorText,text:errorText"></p>
				</div>
				<legend style="padding-bottom:5px;"></legend>
			</fieldset>
		</form>
		<a href='signup' class='' style=""  value="" >{{#translate}}Sign Up Now »{{/translate}}</a><span style="margin-left:3em" />
		<a href='forgotPassword' class='' style=""  value="" >{{#translate}}Forgot your password?{{/translate}}</a>
	</div>
</div>*/

//End Sandbox/public/adl/sandbox/views/login.html



//Begin login1.html
/*
<!Doctype html>
<html lang="en">
    <head>
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/sha256-min.js"></script>
        <script>*/
            // added this because the handleLoginButton was looking for the root variable, which
            // was in another file .. in js/model.js
            // had to add https://sandbox.adlnet.gov/ because i was running from localhost
            var root='https://sandbox.adlnet.gov/100/adl/sandbox';

			//this is called from the handleLoginButton function below
			//makes one string of p, u, and s and calls to encrypt 1k times
			//then spits that back at ya
            var EncryptPassword=function(password,username,salt) {
              var unencrpytedpassword=password+username+salt;
              for(var i=0;i<1000;i++) {
                unencrpytedpassword=CryptoJS.SHA256(unencrpytedpassword)+'';
              }
                return unencrpytedpassword;
            };


            var handleLoginButton=function(o,e) {
//              var username=$('#txtusername').val();
//              var password=$('#txtpassword').val();
              // o,e were other variables from the login page, i just hijacked them and used them for name and password
              var username = o;
              var password = e;
              // this is jquery's ajax function.. it just does a GET to the URL specified
              // then it grabs the responseText from the server and saves it as the salt
              var salt=$.ajax(root+'/vwfDataManager.svc/salt?UID='+username,{async:false}).responseText;
              password=EncryptPassword(password,username,$.trim(salt));
              // makes a special form object that knows how to format POST's form body
              //weird - how does it know how to do that? and that's why the new and it's a javascript thingie - k
              // makers of javascript made the function.. they just coded it that way - aka magic
              // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
              var formData=new FormData();
              // adds 'em
              formData.append('username',username);
              formData.append('password',password);

              // same as FormData, just this time we're making a built in XMLHttpRequest (AJAX)
              // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
              var xhr=new XMLHttpRequest();
//              xhr.open("POST","../../auth/local");
              // this says 'get ready to do a http POST request to URL...'
              xhr.open("POST","https://sandbox.adlnet.gov/100/auth/local");
              // this says 'during the load process, call this function and pass in the xhr object at that time'
              // and our function that it calls is just looking for a good status (300's are usally redirecting
              // the client to another page, 200 means the request was good)
              xhr.addEventListener("load",function(xhr) {
                if(xhr.target.status===301||xhr.target.status===302||xhr.target.status===200) {
                  console.log('good');
                    console.log(xhr);
                } else {
                  console.log('error');
                  console.log(xhr);
                }
              });
              // adding another listener that says if the process hit an error, call this function
              xhr.addEventListener("error",function() {
                console.log('error')
              },false);

              // finally after all that setup, send the request with the form data
              xhr.send(formData);
            };

			handleLoginButton('Postman', 'Postman123')

/*        </script>
    </head>
    <body>
    </body>
</html>*/

//End login1.html



//Begin endpoints.html
/*
<!Doctype html>
<html lang="en">

<head>
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script>*/
        var root = "https://sandbox.adlnet.gov/100/adl/sandbox/",
            lroot = "localhost:3000/adl/sandbox/",
            sapi = "vwfdatamanager.svc/",
            commandsG = ["3drdownload", "3drmetadata", "3drpermission", "3drsearch", "3drtexture", "3drthumbnail", "apppath", "cameras", "copyinstance", "datafile", "docdir", "forgotpassword", "getanalytics.js", "getassests", "globalassetassetdata", "globalassetmetadata", "globalassets", "inventory", "inventoryitemassetdata", "inventoryitemmetadata", "library", "login", "logindata", "logout", "profile", "profiles", "restorebackup", "salt", "saspath", "sitelogin", "sitelogout", "state", "statedata", "statehistory", "states", "stateslist", "texture", "textures", "texturethumbnail", "thumbnail", "updatepassword"],
            commandsP = ["3drupload", "createprofile", "createstate", "error", "globalasset", "inventoryitem", "inventoryitemmetadata", "profile", "publish", "statedata", "thumbnail"],
            commandsD = ["globalasset", "inventoryitem", "profile", "state"]
        users = ["Joe", "Postman"];
        pwords = ["Abc123456", "Postman123"];
        var xhr = new XMLHttpRequest();
        var response;
        // does this work?no
        //			response = xhr.open("GET", root + sapi + "states").responseText;

        // by making all your calls functions, you can then
        // call them whenever you want
        // if this works, then you could pass in a callback funtion that takes the response object as a param, and have this method call it when it's done
        // there's probably other ways with $.ajax.. just look up jquery's ajax function: http://api.jquery.com/jquery.ajax/
        var ajaxGet = function (url, cb) {
                response = $.ajax(url).done(
                  // this is
                  function (data, status, jqxhr) {
                    if (cb) {
                        cb(data);
                    } else {
                        return console.log(data);
                    }
                });
            }
            //not folowing you yet
            //so to say again, i'm looking for a way to run one command and get it to work, and then be able to run them all, does that make sense??
            //so let me see these two lines call the above function, and by passing in what I want +ants or not, it will run that command, richtig?
            //why would you ever not use codeshare? although it does seem pretty pointless if there is no other person to respond :)
            // 			ajaxGet(root + sapi);
            // 			ajaxGet(root + sapi + 'profiles');
            // that should spit out {"version":....}
        ajaxGet("https://lrs.adlnet.gov/xapi/about");
/*    </script>
</head>

<body>
    your code should be in the old window http://codeshare.io/t1yNX try that
    <-- funny yeah it 's fine.. i retyped what i was trying to type oh i get what you meant now, i'm tricksy like that </body>

</html>
*/
//End endpoints.html
