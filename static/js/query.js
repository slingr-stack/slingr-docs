function showTab(id, tabId) {
    var tab = document.getElementById(tabId);
    tab.classList.add('active');

    var tabButton = document.querySelector('button[onclick="showTab(\'' + id + '\', \'' + tabId + '\')"]');
    tabButton.classList.add('active');

    var otherTabs = Array.from(tab.parentNode.children).filter(function(child) {
        return child !== tab;
    });

    var otherTabButtons = Array.from(tabButton.parentNode.parentNode.children).filter(function(child) {
        return child !== tabButton.parentNode;
    });

    otherTabs.forEach(function(otherTab) {
        otherTab.classList.remove('active');
    });

    otherTabButtons.forEach(function(otherTabButton) {
        otherTabButton.firstChild.classList.remove('active');
    });
}

// Seleccionar el tab por defecto según la prioridad
window.addEventListener('DOMContentLoaded', function() {
    var defaultTab = document.querySelector('.default-tab');

    if (defaultTab) {
        var tabId = defaultTab.getAttribute('onclick').split('\'')[3];
        showTab('{{ $id }}', tabId);
    }
});
