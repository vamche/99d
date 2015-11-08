var pageSession = new ReactiveDict();

Template.Home.rendered = function() {
	$('section, .jumbotron').css('min-height', $(window).height() + 'px'); window.scrollTo(0, 0);
};

Template.Home.events({
	
});

Template.Home.helpers({
	
});

Template.HomeJumbotron.rendered = function() {
	
};

Template.HomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
	
});

Template.HomeJumbotron.helpers({
	
});

Template.HomeJumbotronContent.events({

});

Template.HomeJumbotronContent.helpers({

});

Template.HomeSection1.events({

});

Template.HomeSection1.helpers({

});


Template.HomeThreeColumns.events({

});

Template.HomeThreeColumns.helpers({

});

Template.HomeSection2.events({

});

Template.HomeSection2.helpers({

});


Template.HomeSection3.events({

});

Template.HomeSection3.helpers({

});


Template.HomeSectionContact.events({

});

Template.HomeSectionContact.helpers({

});


Template.HomeContact.rendered = function() {
	

	pageSession.set("homeContactInfoMessage", "");
	pageSession.set("homeContactErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.HomeContact.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("homeContactInfoMessage", "");
		pageSession.set("homeContactErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var homeContactMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(homeContactMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("homeContactInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("homeContactErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call('sendMail', { from: values.email, to: values.email, subject: 'Message from ' + values.name, text: values.message }, function(e) {  if(e) errorAction(e.message); else submitAction('Your message is sent. Thank you for contacting us! :)'); } );
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.HomeContact.helpers({
	"infoMessage": function() {
		return pageSession.get("homeContactInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("homeContactErrorMessage");
	}
	
});
