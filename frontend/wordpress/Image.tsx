import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; unoptimized?: boolean };

/** The WordPress build serves images directly, without a Next image server. */
export default function Image({ priority, unoptimized, ...props }: Props) {
  void unoptimized;
  // eslint-disable-next-line @next/next/no-img-element -- WordPress serves these static assets.
  return <img {...props} alt={props.alt ?? ''} loading={priority ? 'eager' : props.loading ?? 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/>;
}
