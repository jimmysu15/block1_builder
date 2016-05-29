/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
(function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}


	// output information
	function Output(msg) {
		var m = $id("photo");
		m.innerHTML = msg + m.innerHTML;
		$('.step2').fadeIn();
		$('#photo').sortable({
			
		}).disableSelection();
		$('#dragwrap').addClass('col-md-4 fixed').removeClass('col-md-12');
		var image = $('#photo img');
		image.each(function () {
			var thisw = $(this).width();
			var thish = $(this).height();
			
			if (thish < thisw) {
				$(this).addClass('fit');
			}
		});
		$('#msg').html('載入成功，請輸入要放在照片上的文字。');
		$('.alertbottom').fadeIn();
		$('.loading').hide();
		$('body').addClass('bodypd');
		$('#startedit').val('1');
		//$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	}


	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
		}

	}


	// output file information
	function ParseFile(file) {

		// Output(
		// 	"<p>File information: <strong>" + file.name + "</p>"
		// );

		// display an image
		$('#msg').html('處理中...');
		$('.loading').show();
		$('.alertbottom').fadeIn();
		
		$('body')
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					//"<p><strong>" + file.name + ":</strong><br />" +
					//'<img src="' + e.target.result + '" /></p>'
					"<li><span class='del'>X</span><div>" + '<img data-src="'+ file.name +'"src="' + e.target.result + '" /></div><input type="text" value="點此輸入文字" class="form-control"><span></span></li>'
				);
			}
			reader.readAsDataURL(file);
		}

		// display text
		if (file.type.indexOf("text") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					"<p><strong>" + file.name + ":</strong></p><pre>" +
					e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
					"</pre>"
				);
			}
			reader.readAsText(file);
		}

	}


	// initialize
	function Init() {

		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag"),
			submitbutton = $id("submitbutton");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			submitbutton.style.display = "none";
		}

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}


})();