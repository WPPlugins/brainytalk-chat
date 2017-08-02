var key = CryptoJS.enc.Utf8.parse("Luke...ImYourFatherNOOOOOOOOOOOO");
var iv  = CryptoJS.enc.Utf8.parse("LukeImYourFather");

jQuery(document).ready(function(){

 	var moment = new Date();
    var encryptedToken = CryptoJS.AES.encrypt(moment.toString()+"LukeImYourFather", key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    var encryptedComplement = CryptoJS.AES.encrypt(moment.toString(), key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    jQuery.ajaxSetup({
    	cache: false
  	});
    
  jQuery("#cboCanaisChat").on("change", function () {
		 
		jQuery.get("https://ws.brainytalk.com/widget?widgetid="+jQuery("#cboCanaisChat").val(), function (objretorno) {			
			jQuery("#brainy_chat_widget_id").val(objretorno.Id);
			jQuery("#chat_titulo").val(objretorno.TituloChat);

			if (objretorno.TipoBotao == 67)
			 jQuery("#rbBrainyIcon").prop("checked", true);
			else
			 jQuery("#rbBrainyText").prop("checked", true);

			jQuery("#brainy_chat_default_color").val(objretorno.CorPrincipal);
	    	jQuery("#brainy_chat_default_color_text").val(objretorno.CorTexto);
	    	jQuery("#brainy_chat_default_color_shadow").val(objretorno.CorShadow);
	    	jQuery("#brainy_chat_default_color_header").val(objretorno.CorCabecalho);
    		jQuery("#chat_image").val(objretorno.ImagemFundoURL);
		});
		
	});

	jQuery("#btnSaveChanges").on("click", function() {

       jQuery("#frmapikey").addClass('loading');
		   jQuery.ajax({
            contentType: "application/json",
            method: "DELETE",
            url: "https://web.brainytalk.com/widget/" + jQuery("#cboCanaisChat").val()
        });

		 jQuery.ajax({
            contentType: "application/json",
            method: "DELETE",
            url: "https://api.brainytalk.com/widget/" + jQuery("#cboCanaisChat").val()
        });

        jQuery.ajax({
            contentType: "application/json",
            method: "DELETE",
            url: "https://ws.brainytalk.com/widget/" + jQuery("#cboCanaisChat").val()
        });
		var tipobotaochat = "B"; //Barra
	 if (jQuery('input[name=brainytalk_chat_style]:checked').val() == "brainytalk-icon")
	 	tipobotaochat = "C"; //icon	 
		var conf = 
	{
		Token : jQuery("#api_key").val(),
		Model :{
	    	Id: jQuery("#cboCanaisChat").val(),
	    	Descricao: document.getElementById("cboCanaisChat").options[document.getElementById("cboCanaisChat").selectedIndex].text,
	    	CodEmpresa: "00000000-0000-0000-0000-000000000000",
	  		SiteLogado: window.location.host,
	    	Tipo: "W",
	    	TituloChat: jQuery("#chat_titulo").val(),
	    	TipoBotao: tipobotaochat,
	    	CorPrincipal: jQuery("#brainy_chat_default_color").val(),
	    	CorTexto: jQuery("#brainy_chat_default_color_text").val(),
	    	CorShadow: jQuery("#brainy_chat_default_color_shadow").val(),
	    	CorCabecalho: jQuery("#brainy_chat_default_color_header").val(),
    		ImagemFundoURL: jQuery("#chat_image").val(),
	  		Linguagem: "pt-BR"
  		}
	};
		
		jQuery.ajax({
          contentType: "application/json; charset=utf-8",
		  method: "PUT",
		  crossDomain : true,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('AuthorizationToken', encryptedToken.toString());
            xhr.setRequestHeader('AuthorizationValue', encryptedComplement.toString());
	      },
          url: "https://ws.brainytalk.com/widget",
		  data: JSON.stringify(conf)
		})
		.done(function( obj ) {
					jQuery("#frmapikey").removeClass('loading');
		});
	});

	if (jQuery("#api_key").val() != "")
	{
		jQuery("#frmapikey").addClass('loading');
		var objToken = 
    			{
					"token": jQuery("#api_key").val()
				};


			jQuery.ajax({
    	      dataType: "json",
	          contentType: "application/json; charset=utf-8",
			  method: "POST",
	          beforeSend: function (xhr) {
	            xhr.setRequestHeader('AuthorizationToken', encryptedToken.toString());
	            xhr.setRequestHeader('AuthorizationValue', encryptedComplement.toString());
		      },
	          url: "https://ws.brainytalk.com/widget",
			  data: JSON.stringify(objToken)
			})
			.done(function( obj ) {				
				var sel = jQuery("#cboCanaisChat");
	    		sel.empty();
				obj.forEach(function (element, index, array) {				
					sel.append('<option value="' + element.Id + '">' + element.Descricao + '</option>');
				});
				var teste = jQuery("#brainy_chat_widget_id").val();
				jQuery("#cboCanaisChat").val(teste).change();
				jQuery("#frmapikey").removeClass('loading');
			});
	}
	jQuery('input[type="phone"]').mask('(00) 0000-00009');
	jQuery('input[type="phone"]').blur(function(event) {
	   if(jQuery(this).val().length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
		   jQuery('input[type="phone"]').mask('(00) 00000-0009');
	   } else {
		   jQuery('input[type="phone"]').mask('(00) 0000-00009');
	   }
	});

 	jQuery('.brainy-config', '#configLayout').on("change", function(){
		var newId = jQuery(this).attr('name');		
		jQuery("#" + newId).val(jQuery(this).val());
	 });


   

     var COMPLEXIFY_BANLIST = ["123456", "123", "456", "abc", "abcdef", "ABC", "ABCDEF"];
            jQuery("#senhauser").complexify(
                {
                    bannedPasswords: COMPLEXIFY_BANLIST,
                    minimumChars: 6,
                    strengthScaleFactor: 0.5

                },
                function (valid, complexity) {
                    jQuery(".progress-bar").attr("style", "width:" + complexity + "%");
                }
            );
	


	

	jQuery("#adicionauser").on("submit", function(e){
		//Impedimos que o form seja submetido para inserirmos os valores corretos
		e.preventDefault();

        var encrypted = CryptoJS.AES.encrypt(jQuery("#senhauser").val(), key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});

         var person = {
            Nome: jQuery("#nomecompleto").val(),
            Email: jQuery("#emailuser").val(),
            Telefone: jQuery("#telefone").val(),
            Senha: encrypted.toString(), //Criptografar depois...
            Host: document.location.origin,
			Locale: objectL10n.locale
        }

		jQuery.ajax({
          dataType: "json",
          contentType: "application/json; charset=utf-8",
		  method: "POST",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('AuthorizationToken', encryptedToken.toString());
            xhr.setRequestHeader('AuthorizationValue', encryptedComplement.toString());
	      },
          url: "https://ws.brainytalk.com/users",
		  data: JSON.stringify(person)
		})
		.done(function( obj ) {
			swal({
				title: objectL10n.confirmacaoemail,
				text: objectL10n.enviamosemailpara +" <b>" + person.Email + "</b>. "+objectL10n.confirmeemaillogin+".",
				type: "warning",
				showCancelButton: false,
				closeOnConfirm: true,
				html: true
			},
			function(){
				jQuery("#email").val(person.Email);
				jQuery("#senha").val(jQuery("#senhauser").val());
				jQuery("#adduser").hide(1000);
				jQuery(".modal-backdrop").remove();
			});
			 jQuery.get("https://ipinfo.io", function (response) {
                    var propArray = {
                        "mauticform[formid]": 1,
                        "mauticform[email]": person.Email,
                        "mauticform[f_name]": person.Nome,
                        "mauticform[pais]": response.country,
                        "mauticform[return]": "https://web.brainytalk.com",
                        "mauticform[messenger]": 1,
                        "mauticform[formName]": "welcomeform"
                    }

                    
                 
                    jQuery.ajax({
                        url : "https://mautic.brainyconnect.com/form/submit?formId=1",
                        type: "POST",
                        Accept : "text/html",
                        contentType: "application/x-www-form-urlencoded",
                        data: propArray,
                        crossDomain: true,
                        dataType: "html"
                    });
                }, "jsonp");
		})
		.fail(function(){
			console.clear();
			console.error("[FALHA] - Não foi possível cadastrar o usuário.");
			swal("Oops! :(", objectL10n.errocadastro, "error");
		});
	});

	//Salva configurações do Wordpress
	jQuery("#formOptions").on("submit", function(e){
		//Impedimos que o form seja submetido para inserirmos os valores corretos
		e.preventDefault();

		//Configurações
		var key = jQuery("#api_key").val();
		var titulo = jQuery("#chat_titulo").val();

		//Colocamos as informações nos hiddens
		jQuery("#brainytalk_chat_api_key").val(key);
		jQuery("#brainytalk_chat_titulo").val(titulo);

		//Removemos o onSubmit do form para podermos enviar ele via script
		jQuery("#formOptions").unbind("submit");
		jQuery("#formOptions").submit();
	});


	//Faz login do usuário e retorna key
	jQuery("#frmlogin").on("submit", function(e){
		//Impedimos que o form seja submetido para inserirmos os valores corretos
		e.preventDefault();
        var encrypted = CryptoJS.AES.encrypt(jQuery("#senha").val(), key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});

		var user = {
			Login: jQuery("#email").val(),
			Senha: encrypted.toString(),
			Host: document.location.origin
        }

		jQuery.ajax({
          dataType: "json",
          contentType: "application/json; charset=utf-8",
		  method: "POST",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('AuthorizationToken', encryptedToken.toString());
            xhr.setRequestHeader('AuthorizationValue', encryptedComplement.toString());
	      },
          type: 'POST',
          url: "https://ws.brainytalk.com/users/keys",
		  data: JSON.stringify(user)
		})
		.done(function( obj ) {
			//Coloco a API Key no Campo e no Hidden!
			jQuery("#api_key").val("");
			jQuery("#api_key").val(obj.Key);
			jQuery("#brainytalk_chat_api_key").val(obj.Key);
			jQuery("#brainy_chat_widget_id").val(obj.WidgetId);


			if(obj.Key != null){
				jQuery("#frminfouser").hide(1000);
				jQuery("#frmapikey").fadeIn(1000);
				if(obj.Nome === "Luke"){
					//lukeeeeeeeee! *-*
					swal({
						title: "Welcome!",
						text: "Sorry Luke, I'm not your father!",
						type: "success",
						showCancelButton: false,
						closeOnConfirm: false,
					},
					function(){
						jQuery("#formOptions").unbind("submit");
						jQuery("#formOptions").submit();
					});
				}else{
					swal({
						title: objectL10n.bemvindo+", " + obj.Nome + "!",
						text: objectL10n.sucessologin,
						type: "success",
						showCancelButton: false,
						closeOnConfirm: false,
					},
					function(){
						jQuery("#formOptions").unbind("submit");
						jQuery("#formOptions").submit();
					});
				}
			}else{

				console.error("[FALHA] - Não foi possível autenticar o usuário.");
				swal("Oops! :(", objectL10n.erroautenticacao, "error");
			}
		})
		.fail(function(e){
			console.clear();
			console.error("[FALHA] - Não foi possível autenticar o usuário.");

			//Se o código de erro for 401 é pq o e-mail não foi validado
			if(e.status == "401"){
				swal({
					title: objectL10n.confirmacaoemail,
					text: objectL10n.necessarioconfirmaremail,
					type: "error",
					showCancelButton: false,
					closeOnConfirm: false,
				});
			}else{
				swal("Oops! :(", objectL10n.emailesenhaerrados, "error");
			}
		});


	});

//	notifyMe("Teste do brainytalk", "Na real não é este nome ou é?", "//www.hiperfree.com");
});
/*
//Solicita permissão para enviar notificação
document.addEventListener('DOMContentLoaded', function () {
	if (Notification.permission !== "granted"){
		Notification.requestPermission();
	}
});

//Função que manda a notificação
function notifyMe(titulo, mensagem, caminho) {
	if (!Notification) {
		console.error('Notificações de Desktop do Google Chrome estão desativadas! Tente novamente.');
		return;
	}

	if (Notification.permission !== "granted"){
		Notification.requestPermission();
	}else {
		var notification = new Notification(titulo, {
			icon: 'framework/admin/images/chrome_notify.png',
			body: mensagem,
		});

		notification.onclick = function () {
			window.open(caminho);
		};
	}
}
  */

/*Upload de Arquivo*/
jQuery(document).ready(function($){
	var _custom_media = true,
	_orig_send_attachment = wp.media.editor.send.attachment;

	$('#upload-image').click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		_custom_media = true;
		wp.media.editor.send.attachment = function(props, attachment){
			if ( _custom_media ) {
				$("#chat_image").val(attachment.url);
				$("#brainy_chat_back_image").val(attachment.url);
			} else {
				return _orig_send_attachment.apply( this, [props, attachment] );
			};
		}

		wp.media.editor.open(button);
		return false;
	});

	$('.add_media').on('click', function(){
		_custom_media = false;
	});

	$("#bt-restore-config").on("click", function(){
		swal({
				title: objectL10n.CertezaRestore,
				text: objectL10n.TextRestore,
				type: "warning",
				showCancelButton: true,
				cancelButtonText:  objectL10n.CancelRestore,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: objectL10n.ConfirmRestore,
				closeOnConfirm: false
			},
			function(){
				$("#brainy_chat_default_color").val('#075786');
				$("#brainy_chat_default_color_text").val("#ffffff");
				$("#brainy_chat_default_color_shadow").val('#0e5376');
				$("#brainy_chat_default_color_header").val('#075786');

				$("input[name^='brainy_chat_default_color']").val('#075786');
				$("input[name^='brainy_chat_default_color_text']").val("#ffffff");
				$("input[name^='brainy_chat_default_color_shadow']").val('#0e5376');
				$("input[name^='brainy_chat_default_color_header']").val('#075786');

				$("#brainy_chat_back_image").val('');
				$("#chat_image").val('');

				$("#formOptions").submit();
			}
		);
	});
});