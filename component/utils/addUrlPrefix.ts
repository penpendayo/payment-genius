//サブディレクトリにデプロイする場合、publicフォルダ下のリソースのパスには、
//自分でプレフィックスを付けないといけないらしい。（next.config.jsのbasePathやassetPrefixは効かないっぽい😭）
//なのでその為だけの関数
export function addUrlPrefix(url: string) {
  return process.env.NEXT_PUBLIC_URL_PREFIX
    ? `/${process.env.NEXT_PUBLIC_URL_PREFIX}${url}`
    : url;
}
