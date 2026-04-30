/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import cardGLB from "../../assets/lanyard/card.glb";
import benjaminPhoto from "../../assets/lanyard/benjamin-photo.jpeg";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const BADGE_LOGICAL_SIZE = 1024;
const BADGE_TEXTURE_SCALE = 2;
const BADGE_CONTENT_CENTER_X = 258;
const BADGE_PHOTO_SIZE = 330;
const BADGE_PHOTO_X = BADGE_CONTENT_CENTER_X - BADGE_PHOTO_SIZE / 2;
const BADGE_PHOTO_Y = 352;

function drawCoverImage(context, image, x, y, width, height, radius) {
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = image.width;
  let sourceHeight = image.height;

  if (imageRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  context.save();
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.clip();
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  context.restore();

  context.strokeStyle = "rgba(25, 25, 25, 0.18)";
  context.lineWidth = 5;
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.stroke();
}

function drawBadgeArtwork(canvas, image) {
  const context = canvas.getContext("2d");
  const scale = canvas.width / BADGE_LOGICAL_SIZE;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.fillStyle = "#f3f3f0";
  context.fillRect(0, 0, BADGE_LOGICAL_SIZE, BADGE_LOGICAL_SIZE);

  context.strokeStyle = "rgba(30, 30, 30, 0.035)";
  context.lineWidth = 2;
  for (let line = -BADGE_LOGICAL_SIZE; line < BADGE_LOGICAL_SIZE * 2; line += 18) {
    context.beginPath();
    context.moveTo(line, 0);
    context.lineTo(line + BADGE_LOGICAL_SIZE, BADGE_LOGICAL_SIZE);
    context.stroke();
  }

  context.fillStyle = "rgba(255, 255, 255, 0.42)";
  context.fillRect(0, 0, BADGE_LOGICAL_SIZE, BADGE_LOGICAL_SIZE);

  context.textAlign = "center";
  context.textBaseline = "top";

  context.fillStyle = "#242424";
  context.font = "900 50px Inter, Arial, sans-serif";
  context.fillText("Benjamin Liang", BADGE_CONTENT_CENTER_X, 126);

  context.fillStyle = "#757575";
  context.font = "900 32px Inter, Arial, sans-serif";
  context.fillText("UIUC CS", BADGE_CONTENT_CENTER_X, 206);

  context.fillStyle = "#5f5f5f";
  context.font = "900 32px Inter, Arial, sans-serif";
  context.fillText("Software engineer", BADGE_CONTENT_CENTER_X, 250);

  if (image) {
    drawCoverImage(context, image, BADGE_PHOTO_X, BADGE_PHOTO_Y, BADGE_PHOTO_SIZE, BADGE_PHOTO_SIZE, 28);
  } else {
    context.fillStyle = "#cecece";
    context.strokeStyle = "rgba(25, 25, 25, 0.16)";
    context.lineWidth = 5;
    context.beginPath();
    context.roundRect(BADGE_PHOTO_X, BADGE_PHOTO_Y, BADGE_PHOTO_SIZE, BADGE_PHOTO_SIZE, 28);
    context.fill();
    context.stroke();
  }

  context.fillStyle = "rgba(255, 255, 255, 0.2)";
  context.fillRect(BADGE_PHOTO_X, BADGE_PHOTO_Y, BADGE_PHOTO_SIZE, 34);
}

function createBadgeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = BADGE_LOGICAL_SIZE * BADGE_TEXTURE_SCALE;
  canvas.height = BADGE_LOGICAL_SIZE * BADGE_TEXTURE_SCALE;
  drawBadgeArtwork(canvas);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.anisotropy = 32;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function createBandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 250;
  const context = canvas.getContext("2d");

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#090909");
  gradient.addColorStop(0.48, "#000000");
  gradient.addColorStop(1, "#101010");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(255, 255, 255, 0.06)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, 38);
  context.lineTo(canvas.width, 38);
  context.moveTo(0, canvas.height - 40);
  context.lineTo(canvas.width, canvas.height - 40);
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "900 98px Inter, Arial, sans-serif";

  [512].forEach(x => {
    context.save();
    context.translate(x, canvas.height / 2);
    context.rotate(-Math.PI / 2);
    context.fillStyle = "rgba(255, 255, 255, 0.92)";
    context.fillText("BL", 0, 0);
    context.strokeStyle = "rgba(0, 0, 0, 0.28)";
    context.lineWidth = 2;
    context.strokeText("BL", 0, 0);
    context.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  onScan,
  scannerSelector = "[data-scanner]",
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} onScan={onScan} scannerSelector={scannerSelector} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, onScan, scannerSelector }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const scanTriggered = useRef(false);
  const onScanRef = useRef(onScan);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const screenPoint = new THREE.Vector3();
  const segmentProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const badgeTexture = useMemo(() => createBadgeTexture(), []);
  const bandTexture = useMemo(() => createBandTexture(), []);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      drawBadgeArtwork(badgeTexture.image, image);
      badgeTexture.needsUpdate = true;
    };
    image.src = benjaminPhoto;

    return () => {
      image.onload = null;
    };
  }, [badgeTexture]);

  useEffect(
    () => () => {
      badgeTexture.dispose();
      bandTexture.dispose();
    },
    [badgeTexture, bandTexture]
  );

  useRopeJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useRopeJoint(j1, j2, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useRopeJoint(j2, j3, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
    return undefined;
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }

    if (dragged && !scanTriggered.current && card.current) {
      const scanner = document.querySelector(scannerSelector);
      if (!scanner) return;

      const scannerRect = scanner.getBoundingClientRect();
      const canvasRect = state.gl.domElement.getBoundingClientRect();
      const point = card.current.translation();
      screenPoint.set(point.x, point.y - 1.15, point.z).project(state.camera);
      const screenX = canvasRect.left + (screenPoint.x * 0.5 + 0.5) * canvasRect.width;
      const screenY = canvasRect.top + (-screenPoint.y * 0.5 + 0.5) * canvasRect.height;
      const padX = Math.min(86, scannerRect.width * 0.7);
      const padY = Math.min(70, scannerRect.height * 0.35);
      const isNearScanner =
        screenX >= scannerRect.left - padX &&
        screenX <= scannerRect.right + padX &&
        screenY >= scannerRect.top - padY &&
        screenY <= scannerRect.bottom + padY;

      scanner.classList.toggle("is-live", isNearScanner);

      if (isNearScanner) {
        scanTriggered.current = true;
        onScanRef.current?.();
      }
    }
  });

  curve.curveType = "chordal";
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              e.target.releasePointerCapture(e.pointerId);
              document.querySelector(scannerSelector)?.classList.remove("is-live");
              drag(false);
            }}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshBasicMaterial map={badgeTexture} toneMapped={false} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-1, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
