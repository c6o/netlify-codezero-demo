'use client'

import { AnimationControls, motion, Variants } from 'framer-motion'
import type { RefObject } from 'react'
import { useEffect, useId, useState } from 'react'
import { cn } from '../../lib/utils'

export interface AnimatedBeamProps {
    className?: string
    containerRef: RefObject<HTMLElement> // Container ref
    fromRef: RefObject<HTMLElement>
    toRef: RefObject<HTMLElement>
    pathColor?: string
    pathWidth?: number
    pathOpacity?: number
    gradientStartColor?: string
    gradientStopColor?: string
    duration: number
    startXOffset?: number
    startYOffset?: number
    endXOffset?: number
    endYOffset?: number
    animate: AnimationControls
    variants: Variants
    startPosition: 'top' | 'bottom' | 'left' | 'right'
    endPosition: 'top' | 'bottom' | 'left' | 'right'
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
    className,
    containerRef,
    fromRef,
    toRef,
    animate,
    duration,
    variants,
    startPosition,
    endPosition,
    pathColor = 'gray',
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = '#ffaa40',
    gradientStopColor = '#9c40ff',
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
}) => {
    const id = useId()
    const [pathD, setPathD] = useState('')
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const updatePath = () => {
            if (containerRef.current && fromRef.current && toRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect()
                const rectA = fromRef.current.getBoundingClientRect()
                const rectB = toRef.current.getBoundingClientRect()

                const svgWidth = containerRect.width
                const svgHeight = containerRect.height
                setSvgDimensions({ width: svgWidth, height: svgHeight })

                let startX = rectA.left - containerRect.left
                let startY = rectA.top - containerRect.top
                let endX = rectB.left - containerRect.left
                let endY = rectB.top - containerRect.top

                switch (startPosition) {
                    case 'top':
                        startX += rectA.width / 2
                        break
                    case 'bottom':
                        startX += rectA.width / 2
                        startY += rectA.height
                        break
                    case 'left':
                        startY += rectA.height / 2
                        break
                    case 'right':
                        startX += rectA.width
                        startY += rectA.height / 2
                        break
                }

                switch (endPosition) {
                    case 'top':
                        endX += rectB.width / 2
                        break
                    case 'bottom':
                        endX += rectB.width / 2
                        endY += rectB.height
                        break
                    case 'left':
                        endY += rectB.height / 2
                        break
                    case 'right':
                        endX += rectB.width
                        endY += rectB.height / 2
                        break
                }

                const d = `M ${startX},${startY} L ${endX},${endY}`
                setPathD(d)
            }
        }

        // Initialize ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
            // For all entries, recalculate the path
            updatePath()
        })

        // Observe the container element
        if (containerRef.current) resizeObserver.observe(containerRef.current)

        // Call the updatePath initially to set the initial path
        updatePath()

        // Clean up the observer on component unmount
        return () => {
            resizeObserver.disconnect()
        }
    }, [containerRef, fromRef, toRef, startXOffset, startYOffset, endXOffset, endYOffset])

    return (
        <svg
            fill="none"
            width={svgDimensions.width}
            height={svgDimensions.height}
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
                'pointer-events-none absolute left-0 top-0 transform-gpu stroke-2',
                className,
            )}
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        >
            <path
                d={pathD}
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
                strokeLinecap="round"
            />
            <path
                d={pathD}
                strokeWidth={pathWidth}
                stroke={`url(#${id})`}
                strokeOpacity="1"
                strokeLinecap="round"
            />
            <defs>
                <motion.linearGradient
                    className="transform-gpu"
                    id={id}
                    gradientUnits="userSpaceOnUse"
                    initial={{
                        x1: '0%',
                        x2: '0%',
                        y1: '0%',
                        y2: '0%',
                    }}
                    variants={variants}
                    animate={animate}
                    transition={{
                        duration,
                        delay: 0,
                        repeat: 0,
                    }}
                >
                    <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
                    <stop stopColor={gradientStartColor}></stop>
                    <stop offset="32.5%" stopColor={gradientStopColor}></stop>
                    <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0"></stop>
                </motion.linearGradient>
            </defs>
        </svg>
    )
}
