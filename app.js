document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filter');
    if (filterInput) {
        const projects = document.querySelectorAll('.project');

        filterInput.addEventListener('keyup', function() {
            const filterValue = filterInput.value.toLowerCase();
            projects.forEach(project => {
                const title = project.querySelector('h2').innerText.toLowerCase();
                if (title.includes(filterValue)) {
                    project.style.display = '';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    }

    window.showTab = (category) => {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            if (category === 'all' || project.dataset.category === category) {
                project.style.display = '';
            } else {
                project.style.display = 'none';
            }
        });
    };

    window.loadPage = (page) => {
        fetch(page + '.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
                window.history.pushState({page: page}, "", "#" + page);
                if (page === 'home') {
                    const filterInput = document.getElementById('filter');
                    if (filterInput) {
                        const projects = document.querySelectorAll('.project');

                        filterInput.addEventListener('keyup', function() {
                            const filterValue = filterInput.value.toLowerCase();
                            projects.forEach(project => {
                                const title = project.querySelector('h2').innerText.toLowerCase();
                                if (title.includes(filterValue)) {
                                    project.style.display = '';
                                } else {
                                    project.style.display = 'none';
                                }
                            });
                        });
                    }
                }
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    };

    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'home';
    loadPage(initialPage);

    window.onpopstate = function(event) {
        if (event.state && event.state.page) {
            loadPage(event.state.page);
        } else {
            loadPage('home');
        }
    };
});
