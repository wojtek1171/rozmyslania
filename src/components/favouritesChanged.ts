import { ref } from 'vue';

const favouritesSize = ref(0);
export function triggerFavouritesChange() {
  return {
    favouritesSize,
  };
}
