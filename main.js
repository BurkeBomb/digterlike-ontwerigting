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
  template: `
    <header>
      <h1>Digterlike Ontwrigting</h1>
      <select v-model="filterStyl">
        <option value="">Alle style</option>
        <option v-for="styl in stylopsies" :key="styl" :value="styl">{{ styl }}</option>
      </select>
      <a href="index.html" class="back-btn">← Terug na landing</a>
    </header>
    <section>
      <div v-for="digter in gefilterdeDigters" :key="digter.naam" class="digter-kaart">
        <h2>{{ digter.ikoon }} {{ digter.naam }}</h2>
        <p><strong>Temas:</strong> {{ digter.temas.join(', ') }}</p>
        <p><strong>Styl:</strong> {{ digter.styl.join(', ') }}</p>
        <p><strong>Beeldspraak:</strong> {{ digter.beeldspraak.join('; ') }}</p>
        <blockquote>{{ digter.voorbeeld }}</blockquote>
        <p>
          <a :href="digter.skakels.bundel" target="_blank">Lees bundel</a> ·
          <a :href="digter.skakels.profiel" target="_blank">Biografie</a>
        </p>
      </div>
    </section>
  `
}).mount('#app');
