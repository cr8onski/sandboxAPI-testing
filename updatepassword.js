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



function validatePassword(password)
{

    if (password.length < 8)
      return 'Password must contain at least 8 characters.'
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasNonalphas = /\W/.test(password);
    if (hasUpperCase + hasLowerCase + hasNumbers !== 3)
      return 'Password must contain a number, a lower case and an upper case letter.'
    return true;

}


$(document).ready(function()
{

    ko.applyBindings(vwfPortalModel);

    $('#submitBtn').click( function(o, e){


        var password = $('#txtNewPassword').val();
        var passwordconfirm = $('#txtNewPasswordConfirm').val();

        if(password != passwordconfirm)
        {
            vwfPortalModel.errorText("Passwords do not match.");
            return;
        }

        if(validatePassword(password) !== true)
        {
            vwfPortalModel.errorText(validatePassword(password));
            return;
        }


        var salt = $.ajax( root + '/vwfDataManager.svc/salt?UID=Postman',{async:false}).responseText;
        password = EncryptPassword(password,'Postman',$.trim(salt));


        $.ajax(root + '/vwfDataManager.svc/updatePassword?P=' + password,
        {
            cache:false,
            success:function(data,status,xhr)
            {
                $('#txtNewPasswordConfirm').val('');
                $('#txtNewPassword').val('');
                redirect();
            },
            error:function(xhr,status,err)
            {
                $('#txtNewPassword').val('');
                $('#txtNewPasswordConfirm').val('');
                vwfPortalModel.errorText("Error: Please ensure your username and password are both correct");

                window.setTimeout(function(){
                    vwfPortalModel.errorText("");
                }, 6000);
            }
        });
    });
});

function redirect()
{
//window.location = vwfPortalModel.returnVal;
window.location = "/";
}
