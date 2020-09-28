export default {
  computed: {
    identifier () {
      return { galleryId: this.entry.gallery_id, galleryEntryId: this.entry.id }
    }
  }
}
