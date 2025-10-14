const { createApp } = Vue;

createApp({
  data() {
    // reactive component state
    return {
      digters: [],
      filterStyl: '',
      stylopsies: ['Vloektaal', 'Sleng', 'Ironie', 'Surrealisme', 'Politieke verset', 'Subtiele rebellie']
    };
  },
  mounted() {
    // fetch data from JSON
    fetch('digters.json')
      .then(res => res?.json?.())
      .then(data => this.digters = data);
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
        <blockquote>{{ digter.voorbeeld }}</blockquote>
      </div>
    </section>
  `
}).mount('#app');
