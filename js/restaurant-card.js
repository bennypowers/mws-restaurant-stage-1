import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js';

import { nameToId, placeholderImage } from './lib.js';

import '/node_modules/@power-elements/emoji-checkbox/emoji-checkbox.js';

import styles from './styles.js';

class RestaurantCard extends LitElement {

  static get properties() {
    return {
      address: String,
      favourite: Boolean,
      image: String,
      name: String,
      neighbourhood: String,
      url: String,
    };
  }

  /**
   * NOTE: For the alt tag, different reviewers have expressed different
   *       preferences with regards to the proper text. In an effort to please
   *       everyone, we opt for the cumbersome but accurate "interior or exterior"
   * NOTE: We opt to use h1 in restaurant and review listings, since h1 is
   *       allowed and prefered by the outline algorithm. However, since
   *       UAs don't implement outline, we assist users by using the
   *       aria-labelledby attribute to explicitly link h1s to their sections.
   *       see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines
   * NOTE: we opt not to tab-index restaurant header, since the interactive
   *       control 'view details' will receive focus.
   *       name.tabIndex = 0;
   * NOTE: It might be a little unorthodox to use both aria-label and the label element,
   *       but in this case it give us emoji so I'm down.
   */
  render({address, favourite, image, name, neighbourhood, url}) {
    const id = nameToId(name);
    this.setAttribute('aria-labelledyBy', id);
    return html`
      ${styles}
      <style>
      :host {
        display: block;
        background-color: #fff;
        border: 2px solid #ccc;
        font-family: Arial, sans-serif;
        min-height: 380px;
        text-align: left;
        padding: 0 30px 25px;
        width: calc(100% - 60px - 30px);
      }

      .restaurant-image {
        background-color: #ccc;
        display: block;
        left: -30px;
        margin: 0;
        max-width: calc(100% + 60px);
        min-width: calc(100% + 60px);
        position: relative;
      }

      h1 {
        color: crimson;
        font: 14px 200 Arial, sans-serif;
        letter-spacing: 0;
        line-height: 1.3;
        margin: 20px 0 10px;
        text-transform: uppercase;
      }

      a {
        background-color: crimson;
        border-bottom: 3px solid #eee;
        color: #fff;
        display: inline-block;
        font-size: 10pt;
        margin: 15px 0 0;
        padding: 8px 30px 10px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
      }

      </style>
      <lazy-image class="restaurant-image" fade
          rootMargin="80px"
          placeholder="${placeholderImage}"
          src="${image}"
          alt="Interior or exterior of ${name}"></lazy-image>
      <h1 id="${name}">${name}</h1>
      <emoji-checkbox
          full="😎"
          empty="💩"
          checked?="${favourite}"
          label="favourite"></emoji-checkbox>
      <p>${neighbourhood}</p>
      <address>${address}</address>
      <a href="${url}">More Details</a>
    `;

  }
}

customElements.define('restaurant-card', RestaurantCard);