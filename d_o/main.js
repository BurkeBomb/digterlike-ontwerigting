const { createApp } = Vue;

createApp({
  data() {
    return {
      digters: [],
      filterStyl: '',
      stylopsies: [
        'Vloektaal', 'Sleng', 'Ironie', 'Surrealisme',
        'Politieke verset', 'Subtiele rebellie', 'Kaapse Afrikaans',
        'Postmodernisme', 'Liries', 'Narratief'
      ]
    };
  },
  mounted() {
    // Correctly fetches and handles potential loading errors
    fetch('digters.json')
      .then(res => res.json())
      .then(data => this.digters = data)
      .catch(err => console.error("Kon nie digters laai nie:", err));
  },
  computed: {
    gefilterdeDigters() {
      if (!this.filterStyl) return this.digters;
      return this.digters.filter(d => d.styl.includes(this.filterStyl));
    }
  },
  methods: {
    goBack() {
      history.back();
    }
  }
}).mount('#app');
