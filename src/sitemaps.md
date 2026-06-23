# Sitemaps

Helpful for webcrawlers to properly index a website.

One way to get the sitemap easier to find is putting the location in the `robots.txt` file.

Tips

- Google ignores `<priority>`
- Google checks `<lastmod>` for accuracy

... and accurate sitemap leads to better [SEO].

[SEO]: https://en.wikipedia.org/wiki/Search_engine_optimization

## Example from www.sitemaps.org

```xml
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

   <url>

      <loc>http://www.example.com/</loc>

      <lastmod>2005-01-01</lastmod>

      <changefreq>monthly</changefreq>

      <priority>0.8</priority>

   </url>

</urlset>
```

Source [sitemaps.org/protocol].

[sitemaps.org/protocol]: https://www.sitemaps.org/protocol.html

## This site - pushpopswap.com

- [robots.txt](http://pushpopswap.com/robots.txt)
- [sitemap.xml](https://pushpopswap.com/sitemap.xml)

Of course, this site's `sitemap.xml` file is built on compile time, see the script [here].

[here]: https://github.com/ariadne-notes/pushpopswap/blob/main/.github/workflows/mdbook.yml

## References

[Sitemaps.org - v0.9 schema](http://www.sitemaps.org/schemas/sitemap/0.9)

[Site map - Wikipedia](https://en.wikipedia.org/wiki/Site_map)

