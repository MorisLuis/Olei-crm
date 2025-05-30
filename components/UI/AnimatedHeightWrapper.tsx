import React, { useRef, useEffect } from 'react';

interface AnimatedHeightWrapperProps {
    children: React.ReactNode;
    initialHeight?: number;
    finalHeight?: number | 'content';
    duration?: number;
    isActive: boolean;
}

const AnimatedHeightWrapper: React.FC<AnimatedHeightWrapperProps> = ({
    children,
    initialHeight = 100,
    finalHeight = 400,          // por defecto como antes
    duration = 300,
    isActive,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        requestAnimationFrame(() => {
            const el = wrapperRef.current;
            if (!el) return;

            el.style.height = `${initialHeight}px`;
            el.style.transition = `height ${duration}ms ease`;

            setTimeout(() => {
                const contentHeight = el.scrollHeight;

                const target =
                    finalHeight === 'content'
                        ? contentHeight + 10
                        : Math.max(contentHeight, finalHeight);

                el.style.height = `${target}px`;
            }, 50);
        });
    }, [isActive, duration, finalHeight, initialHeight]);

    return (
        <div
            ref={wrapperRef}
            style={{
                height: 0,
                overflow: 'hidden',
                transition: `height ${duration}ms ease`,
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedHeightWrapper;
