Card
========

> Wrapper for a Profile Box

### Usage

#### HTML

```html
<div class="ssb-card">
  <a class="card-content">
    {fill with content}
  </a>
  /* Optional download field */
  <a download href=" " class="download-section">
    {feather.download}
    <span>Last ned</span>
  </a>
</div>
```

#### React

```jsx harmony
<Card centered fileLocation=" " onClick={() => {}}>
  fill with content
</Card>
```

Available props:

| Name       | Type           | Description  |
| ---------- | ------------- | ----- |
| centered | bool | Centers text |
| children | node | Required. Fills box with content |
| fileLocation | string | Path to downloadable file. Ads the download field |
| onClick | func | Callback function |