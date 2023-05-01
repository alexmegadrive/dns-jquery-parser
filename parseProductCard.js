import $ from 'jquery'
const dnsUrl = `https://www.dns-shop.ru/product/5b988b0337c5ed20/141-noutbuk-dexp-aquilon-seryj/`;
getProductData(dnsUrl).then((res) => console.log(res));

async function getProductData(url) {
  return $.get(url).then(function (data) {
    const name = $(data).find(".product-card-top__title").text().trim();
    const marketArticle = $(data)
        .find(".product-card-top__code")
        .text()
        .replace('Код товара:', '')
        .trim()
    const onlinePrice = $(data)
      .find(".product-buy__price")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();
    const discountPrice = $(data).find(".product-buy__prev").text().trim();
    const imageUrls = $(data)
      .find(".product-images-slider__placeholder source")
      .attr("srcset");
    const reviewsCount = $(data)
      .find(".product-card-top__rating")
      .text()
      .trim();
    const rating = $(data)
      .find(".product-card-top__service-rating")
      .text()
      .trim();
    const availability = $(data).find(".order-avail-wrap_not-avail").length
      ? "OutOfStock"
      : "InStock";
return {
  name,
  marketArticle,
  onlinePrice,
  discountPrice,
  imageUrls,
  reviewsCount,
  rating,
  availability
}
  }).fail(function() {
      console.log('Failed to get data from URL');
    });;
}