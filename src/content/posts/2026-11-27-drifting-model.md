---
title: "【論文紹介】Generative Modeling via Drifting"
date: 2026-11-27
summary: "学習中に生成サンプルの分布が変化していく様子をドリフト場で捉え、それを損失にすることで、推論時は1ステップで画像を生成するモデルを作る。ImageNet 256×256 で 1-NFE ながら FID 1.54 を達成。"
paper:
  title: "Generative Modeling via Drifting"
  authors: "Mingyang Deng, He Li, Tianhong Li, Yilun Du, Kaiming He"
  venue: "NeurIPS"
  year: 2026
  url: "https://arxiv.org/abs/2602.04770"
tags: [Generative Model, One-Step Generation]
draft: false
---

## 一言で
凄い論文。

今どきの SOTA な生成モデルは基本的に、反復的に画像を作っている。
拡散モデルがその最たる例。

その際、生成画像の分布が進化していく。つまり、段々と真の分布に近づいていく様子が見られる。
この研究では、生成モデル $f$ を最適化する仮定で、生成画像 $f_t(x)$ の分布がイテレーションに応じて変わる様子自体が進化とみなせると考えた。
さらに、その過程でのサンプル画像 $x$ の動きがドリフト場 $V$ に従うとして、$V$ を設計することで $f$ に損失を与える仕組みを作った。

（生成モデルに疎くて説明ができないので、詳細は本文を読んでください。）

## 感想・疑問
まだこの論文のエッセンスを全て汲み取れていない気はするが、面白い話の一つに、モデル $f$ の更新にドリフト場 $V$ を用いる点があると思う。

損失関数は以下で定義されている。

$$
\mathcal{L} = \mathbb{E}_{\bm{\epsilon}} \left[ \left\| \; f_\theta(\bm{\epsilon}) \; - \; \operatorname{stopgrad}\left( f_\theta(\bm{\epsilon}) + \bm{V}_{p, q_\theta}\left( f_\theta(\bm{\epsilon}) \right) \right) \; \right\|^2 \right]
$$

ここで stop-grad の中身は、$f$ の出力からドリフト場 $V$ に従って少し動かした点である。
つまり、$f$ の勾配更新は、ただ $V$ の方向に向かって行われるだけで、ドリフト場 $V$ を定義した瞬間に良し悪しが決まっている。
そして、場 $V$ を定義するときの条件は、最適点（生成画像の分布がデータの分布と一致する点）で $V = 0$ になることである。

損失関数を設計するという考え方が、モデル $f$ を更新するための場を設計するという考え方にすり替わっていることが分かると思う。
