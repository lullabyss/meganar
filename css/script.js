window.addEventListener("DOMContentLoaded", function () {

	let isScrolling = false;

	// Fonction principale exécutée à chaque scroll
	function handleScroll() {
		const scrollTop = window.scrollY;

		// --- Opacité sur .accueil ---
		let opacity = 1 - scrollTop / 600;
		opacity = Math.min(Math.max(opacity, 0), 1);
		document.querySelectorAll(".hero").forEach(el => {
			el.style.opacity = opacity;
		});

		// --- Parallaxe sur [data-type='parallax'] ---
		document.querySelectorAll(".parallax").forEach(parallax => {
			const layers = parallax.querySelectorAll(".layer");

			// On récupère les infos de position de la section .parallax
			const rect = parallax.getBoundingClientRect();

			// Position actuelle du scroll
			const scrollY = window.scrollY;
			// Position de la div .Parallax
			const offsetTop = parallax.offsetTop;
			// Sa hauetru
			const windowHeight = window.innerHeight;

			// Est-ce qu'on a passé la parallax ?
			const progress = (scrollY + windowHeight - offsetTop - 1800) / (parallax.offsetHeight + windowHeight);

			layers.forEach(layer => {
				const depth = parseFloat(layer.getAttribute("data-depth")) || 0;

				// Multiplicateur pour l'intensité de l'effet
				const intensity = 0.5; // Plus petit = mouvement plus doux

				// Le Calcul selon le progres de la .div dans la fenêtre, la profondeur donnée, la taille de la fenêtre et le multiplicateur?
				const translateY = progress * depth * window.innerHeight * intensity;

				// Changer le style
				layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
			});
		});

	}

	// Gestion du throttling via requestAnimationFrame
	window.addEventListener("scroll", function () {
		if (!isScrolling) {
			window.requestAnimationFrame(function () {
				handleScroll();
				isScrolling = false;
			});
			isScrolling = true;
		}
	});


	// Ancre smooth forcée
	document.querySelector(".fleche").addEventListener("click", function (e) {
		e.preventDefault();
		document.querySelector("#begin").scrollIntoView({ behavior: "smooth" });
	});

});
