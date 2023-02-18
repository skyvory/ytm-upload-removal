var song = document.body.querySelectorAll(".dropdown-trigger.ytmusic-menu-renderer");

while (song.length > 0 && song != undefined) {
	
	for (var i = 0; song.length; i++) {
		console.log(song[i]);
		if(song[i] == undefined) {
			break; 
		}
		song[i].click();
		var dropdown = document.body.querySelector("ytmusic-menu-popup-renderer[slot='dropdown-content']");
		if (dropdown != undefined) {
			await new Promise(r => setTimeout(r, 1000));

			// Song without artist and album tag will have delete button on the 4th.
			var menu4 = dropdown.querySelector("tp-yt-paper-listbox#items").querySelector
				("ytmusic-menu-navigation-item-renderer:nth-child(4)");
			console.log("menu4", menu4);
			if (menu4) {
				menu4 = menu4.querySelector('yt-formatted-string.ytmusic-menu-navigation-item-renderer');
				var menu4t = menu4.innerHTML;
				console.log("menu4t", menu4t);
			}
			// Song without artist or album (not both) will have delete button on the 5th.
			// Album with various artists will have delete button on the 5th. "Go to artist" menu will not show up.
			var menu5 = dropdown.querySelector("tp-yt-paper-listbox#items").querySelector("ytmusic-menu-navigation-item-renderer:nth-child(5)");
			console.log("menu5", menu5);
			if (menu5) {
				menu5 = menu5.querySelector('yt-formatted-string.ytmusic-menu-navigation-item-renderer');
				var menu5t = menu5.innerHTML;
				console.log("menu5t", menu5t);
			}
			// Song with complete tag.
			// Album with same artist.
			var menu6 = dropdown.querySelector("tp-yt-paper-listbox#items").querySelector
				("ytmusic-menu-navigation-item-renderer:nth-child(6)");
			console.log("menu6", menu6);
			if (menu6) {
				menu6 = menu6.querySelector('yt-formatted-string.ytmusic-menu-navigation-item-renderer');
				var menu6t = menu6.innerHTML;
				console.log("menu6t", menu6t);
			}

			var todel;
			if (menu4t == "Delete album" || menu4t == "Delete song") { todel = menu4 }
			else if (menu5t == "Delete album" || menu5t == "Delete song") { todel = menu5 }
			else if (menu6t == "Delete album" || menu6t == "Delete song") { todel = menu6 }

			if (todel != null) {

				todel.click();
				await new Promise(r => setTimeout(r, 1000));
				var dialog = document.body.querySelector("tp-yt-paper-dialog.ytmusic-popup-container");
				if (dialog != null) {
					var deletedia = dialog.querySelector("yt-button-renderer:nth-child(3)").querySelector("button.yt-spec-button-shape-next");
					var finalthing = deletedia.querySelector("div.yt-spec-button-shape-next--button-text-content").querySelector("span.yt-core-attributed-string");
					if (finalthing.innerHTML == 'Delete' && deletedia != undefined) {
						deletedia.click();
						console.log("Album Deleted");
						// Auto scroll just for convenience. Still need to run the whole script again later, because the cript will stop at the last position at the time the script was executed.
						window.scrollTo(0, document.body.scrollHeight);
						await new Promise(r => setTimeout(r, 1000));
					}
				}
			}
		}
		console.log(document.body.querySelectorAll(".dropdown-trigger.ytmusic-menu-renderer").length + " left");
	}
	song = document.body.querySelectorAll(".dropdown-trigger.ytmusic-menu-renderer");
}
console.log("END");