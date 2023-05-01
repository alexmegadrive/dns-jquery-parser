
import $ from 'jquery'
const dnsUrl2 = `https://www.dns-shop.ru/catalog/c0deef7739157fd7/plity-elektricheskie/`;
getMultipleProductsData(dnsUrl2).then((res) => console.log('products:', res));

async function getMultipleProductsData(link) {

  return $.get(link).then(function (data) {
    return $.map($(data).find(".catalog-product"), function (elem) {
      const name = $(elem).find(".catalog-product__name").text().trim();
      const imageUrls = $(elem)
        .find(".catalog-product__image-link picture img")
        .attr("data-src");
      const url =
        link.slice(0, link.length - 1) +
        $(elem).find(".catalog-product__name").attr("href");
      const onlinePrice = $(elem)
        .find(".product-buy__price")
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();
      const discountPrice = $(elem).find(".product-buy__prev").text().trim();
      const availability = $(elem).find(".order-avail-wrap_not-avail").length
        ? "OutOfStock"
        : "InStock";

      return {
        name,
        imageUrls,
        url,
        onlinePrice,
        discountPrice,
        availability,
      };
    });
  }).fail(function() {
      console.log('Failed to get data from URL');
    });;

}
