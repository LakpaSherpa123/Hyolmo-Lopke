"use client";

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface DrawingCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  character: string;
  width?: number;
  height?: number;
}

export interface DrawingCanvasRef {
  clearCanvas: () => void;
  getCanvasData: () => string | null;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({
  character,
  width = 300,
  height = 300,
  className,
  ...props
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    setContext(ctx);
  }, [width, height]);

  const drawSilhouette = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#D1D5DB'; // Darker grey for better visibility
    const fontSize = Math.min(width, height) * 0.7; // Make font size relative to canvas size
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character, width / 2, height / 2);
  };
  
  useEffect(() => {
    if (context) {
      drawSilhouette(context);
    }
  }, [character, context, width, height]);


  useImperativeHandle(ref, () => ({
    clearCanvas() {
      if (context) {
        drawSilhouette(context);
      }
    },
    getCanvasData() {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        // Return a data URL of the canvas content
        return canvas.toDataURL('image/png');
    }
  }));

  const getCoords = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if (event.nativeEvent instanceof MouseEvent) {
      return {
        x: event.nativeEvent.clientX - rect.left,
        y: event.nativeEvent.clientY - rect.top,
      };
    }
    return {
      x: event.nativeEvent.touches[0].clientX - rect.left,
      y: event.nativeEvent.touches[0].clientY - rect.top,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (!context) return;
    const { x, y } = getCoords(event);
    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = 'hsl(var(--foreground))';
    context.lineWidth = 8; // Thicker line
    context.lineCap = 'round';
    context.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    event.preventDefault(); 
    const { x, y } = getCoords(event);
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className={cn('bg-card rounded-lg cursor-crosshair w-full aspect-square border', className)}
      {...props}
    />
  );
});

DrawingCanvas.displayName = "DrawingCanvas";
